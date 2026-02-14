/**
 * Notes data service — resolves subject + topic into note content.
 *
 * Primary lookup: local data bundled in notesData.ts and anatomyNotes.ts.
 * Fallback: Supabase `notes` table for subjects not bundled locally.
 */

import { NOTES } from '../data/notesData';
import { ANATOMY_NOTES } from '../data/anatomyNotes';
import { IMPRESSION_MATERIALS_NOTES } from '../data/impressionMaterialsNotes';
import { CARDIAC_MUSCLE_NOTES } from '../data/cardiacMuscleNotes';
import { CARDIOVASCULAR_PHYSIOLOGY_NOTES } from '../data/cardiovascularPhysiologyNotes';
import { CELL_MEMBRANE_TRANSPORT_NOTES } from '../data/cellMembraneTransportNotes';
import { ENDOCRINOLOGY_NOTES } from '../data/endocrinologyNotes';
import { GENERAL_PHYSIOLOGY_NOTES } from '../data/generalPhysiologyNotes';
import { GI_PHYSIOLOGY_NOTES } from '../data/giPhysiologyNotes';
import { MUSCLE_MECHANICS_NOTES } from '../data/muscleMechanicsNotes';
import { MUSCLE_PHYSIOLOGY_NOTES } from '../data/musclePhysiologyNotes';
import { NERVE_PHYSIOLOGY_NOTES } from '../data/nervePhysiologyNotes';
import { NEUROPHYSIOLOGY_NOTES } from '../data/neurophysiologyNotes';
import { RENAL_PHYSIOLOGY_NOTES } from '../data/renalPhysiologyNotes';
import { RESPIRATORY_PHYSIOLOGY_NOTES } from '../data/respiratoryPhysiologyNotes';
import { supabase } from './supabaseClient';
import { MedicalSubject, ExamStream } from '../types';

export interface NoteData {
  content: string;
  keyPoints: string[];
  subject?: MedicalSubject;
}

/**
 * Combined local notes: merge the main NOTES object with standalone data files
 * so every local lookup goes through a single object.
 */
const ALL_LOCAL_NOTES: Record<string, Record<string, { content: string; keyPoints: string[] }>> = {
  ...(NOTES as unknown as Record<string, Record<string, { content: string; keyPoints: string[] }>>),
  anatomy: ANATOMY_NOTES as unknown as Record<string, { content: string; keyPoints: string[] }>,
  physiology: {
    general_physiology: GENERAL_PHYSIOLOGY_NOTES,
    cell_membrane_transport: CELL_MEMBRANE_TRANSPORT_NOTES,
    nerve_physiology: NERVE_PHYSIOLOGY_NOTES,
    muscle_physiology: MUSCLE_PHYSIOLOGY_NOTES,
    muscle_mechanics: MUSCLE_MECHANICS_NOTES,
    cardiac_muscle: CARDIAC_MUSCLE_NOTES,
    cardiovascular_physiology: CARDIOVASCULAR_PHYSIOLOGY_NOTES,
    respiratory_physiology: RESPIRATORY_PHYSIOLOGY_NOTES,
    renal_physiology: RENAL_PHYSIOLOGY_NOTES,
    gi_physiology: GI_PHYSIOLOGY_NOTES,
    neurophysiology: NEUROPHYSIOLOGY_NOTES,
    endocrinology: ENDOCRINOLOGY_NOTES,
  } as unknown as Record<string, { content: string; keyPoints: string[] }>,
};

/** Map display-name enum values to the slug keys used inside NOTES. */
function subjectToSlug(subject: MedicalSubject): string {
  const map: Record<string, string> = {
    [MedicalSubject.ANATOMY]: 'anatomy',
    [MedicalSubject.PHYSIOLOGY]: 'physiology',
    [MedicalSubject.BIOCHEMISTRY]: 'biochemistry',
    [MedicalSubject.PHARMACOLOGY]: 'pharmacology',
    [MedicalSubject.MICROBIOLOGY]: 'microbiology',
    [MedicalSubject.GENERAL_PATHOLOGY]: 'general_pathology',
    [MedicalSubject.ORAL_HISTOLOGY]: 'oral_histology',
    [MedicalSubject.TOOTH_MORPHOLOGY]: 'tooth_morphology',
    [MedicalSubject.DENTAL_MATERIALS]: 'dental_materials',
    [MedicalSubject.ORAL_PATHOLOGY]: 'oral_pathology',
    [MedicalSubject.ORAL_MEDICINE_RADIOLOGY]: 'oral_medicine_radiology',
    [MedicalSubject.PERIODONTOLOGY]: 'periodontology',
    [MedicalSubject.COMMUNITY_MEDICINE]: 'community_medicine',
    [MedicalSubject.PEDIATRICS]: 'pediatrics',
    [MedicalSubject.GENERAL_EMBRYOLOGY]: 'general_embryology',
  };
  return map[subject] ?? subject.toLowerCase().replace(/[^a-z0-9]+/g, '_');
}

/** Normalise a human-readable topic name to a slug key. */
function topicToSlug(topic: string): string {
  return topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

/**
 * Fetch a note from Supabase as a fallback when local data is missing.
 */
async function fetchFromSupabase(
  subjectSlug: string,
  topicSlug: string,
): Promise<{ content: string; key_points: string[] | null } | null> {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('content, key_points')
      .eq('subject_key', subjectSlug)
      .eq('topic_key', topicSlug)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('[notesService] Supabase query error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error('[notesService] Supabase fetch failed:', err);
    return null;
  }
}

/**
 * Explicit topic slug → local data key aliases.
 * Maps the slugified topic name (from constants.tsx) to the key used in
 * the local data files (e.g. ANATOMY_NOTES, NOTES).
 */
const TOPIC_ALIASES: Record<string, Record<string, string>> = {
  anatomy: {
    // Local file aliases
    osteology_overview: 'osteology',
    skull_bones_sutures: 'skull_bones',
    mandible_anatomy_clinical: 'mandible',
    maxilla_anatomy_gross_clinical: 'maxilla',
    zygoma_zygomatic_bone_detailed_high_yield: 'zygomatic',
    sphenoid_ethmoid_bones: 'sphenoid_ethmoid',
    foramina_fossae_of_the_skull: 'foramina_fossae',
    head_and_neck_muscles: 'head_neck_muscles',

    // Supabase-specific aliases (topic_key in DB doesn't match slugified name)
    larynx_and_thyroid_gland: 'larynx_thyroid',
    triangle_of_the_neck: 'triangle_neck',
  },
  dental_materials: {
    properties_summary: 'properties',
    properties_mechanical: 'mechanical',
    properties_thermal: 'thermal',
    properties_rheology: 'rheology',
    properties_chemical_biological: 'chemical',
    properties_optical: 'optical',
  },
};

function resolveTopicAlias(subjectSlug: string, topicSlug: string): string | null {
  return TOPIC_ALIASES[subjectSlug]?.[topicSlug] ?? null;
}

/**
 * Resolve note data for a given subject / stream / topic combination.
 *
 * 1. Check Supabase `notes` table FIRST (production data).
 * 2. If not found in Supabase, check local bundled data as fallback.
 * 3. Return a "coming soon" placeholder only if both sources miss.
 */
export async function getTopicData(
  subject: MedicalSubject,
  _stream: ExamStream,
  topic?: string,
): Promise<NoteData> {
  const subjectSlug = subjectToSlug(subject);
  const topicSlug = topic ? topicToSlug(topic) : '';

  // ---------- SUPABASE FIRST (PRIMARY SOURCE) ----------

  if (topic) {
    const aliasedTopicKey = resolveTopicAlias(subjectSlug, topicSlug) ?? topicSlug;
    console.log(`[notesService] 🌐 Supabase query: subject=${subjectSlug} topic=${aliasedTopicKey}`);
    const remote = await fetchFromSupabase(subjectSlug, aliasedTopicKey);

    if (remote && remote.content) {
      console.log(`[notesService] ✅ Supabase hit for ${aliasedTopicKey}`);
      return {
        content: remote.content,
        keyPoints: Array.isArray(remote.key_points) ? remote.key_points : [],
        subject,
      };
    }
  }

  // ---------- LOCAL FALLBACK ----------

  const subjectBucket = ALL_LOCAL_NOTES[subjectSlug];

  if (subjectBucket) {
    if (topic) {
      console.log(`[notesService] subject=${subjectSlug} topic="${topic}" → slug="${topicSlug}"`);

      // Direct match
      if (subjectBucket[topicSlug]) {
        console.log(`[notesService] ✅ Direct local match: ${topicSlug}`);
        return { ...subjectBucket[topicSlug], subject };
      }

      // Explicit alias mapping
      const resolvedKey = resolveTopicAlias(subjectSlug, topicSlug);
      console.log(`[notesService] Alias resolved: ${topicSlug} → ${resolvedKey}`);
      if (resolvedKey && subjectBucket[resolvedKey]) {
        console.log(`[notesService] ✅ Alias local match: ${resolvedKey}`);
        return { ...subjectBucket[resolvedKey], subject };
      }

      // Special case: impression materials standalone export
      if (topicSlug.includes('impression')) {
        return {
          content: IMPRESSION_MATERIALS_NOTES,
          keyPoints: [],
          subject,
        };
      }
    } else {
      // No specific topic — return the first entry in the subject bucket
      const firstKey = Object.keys(subjectBucket)[0];
      if (firstKey) {
        return { ...subjectBucket[firstKey], subject };
      }
    }
  }

  // ---------- NOTHING FOUND ----------

  console.log(`[notesService] ❌ NOTHING FOUND for subject=${subjectSlug} topic=${topicSlug}`);
  return {
    content: `# ${topic || subject}\n\nNotes for this topic are coming soon.`,
    keyPoints: [],
    subject,
  };
}



import React from 'react';
import { MedicalSubject, TopicItem } from './types';

//  FCPS / Exam Topic Mappings
export const SUBJECT_TOPICS: Record<string, TopicItem[]> = {
  [MedicalSubject.ANATOMY]: [
    {
      parent: "Osteology",
      subtopics: [
        "Osteology - Overview",
        "Skull Bones & Sutures",
        "Mandible - Anatomy & Clinical",
        "Maxilla - Anatomy (Gross + Clinical)",
        "Zygoma (Zygomatic Bone) - Detailed, High-Yield",
        "Sphenoid + Ethmoid Bones",
        "Foramina & Fossae of the Skull"
      ]
    },

    "Cranial Nerves",
    "Head and Neck Muscles",
    "Triangle of the Neck",
    "Larynx and Thyroid Gland",
    "Temporomandibular Joint (TMJ) Dynamics"
  ],
  [MedicalSubject.PHYSIOLOGY]: [
    "General Physiology",
    "Cell Membrane Transport",
    "Nerve Physiology",
    "Muscle Physiology",
    "Muscle Mechanics",
    "Cardiac Muscle",
    "Cardiovascular Physiology",
    "Respiratory Physiology",
    "Renal Physiology",
    "GI Physiology",
    "Neurophysiology",
    "Endocrinology",
  ],
  [MedicalSubject.BIOCHEMISTRY]: [
    "USMLE Biochemistry Dental Correlations",
    "Carbohydrates: Glycolysis & Krebs Cycle",
    "Lipids: Beta Oxidation & Synthesis",
    "Proteins: Amino Acids & Urea Cycle",
    "Vitamins & Minerals",
    "Enzymes & Kinetics",
    "Genetics: Replication, Transcription, Translation"
  ],
  [MedicalSubject.GENERAL_PATHOLOGY]: [
    "General Patho Overview"
  ],
  [MedicalSubject.PHARMACOLOGY]: [
    "Pharmacokinetics & Dynamics",
    "Autonomic Nervous System (ANS)",
    "Cardiovascular Drugs",
    "Diuretics",
    "Antibiotics & Antifungals",
    "Local Anesthetics (Detailed)"
  ],
  [MedicalSubject.ORAL_HISTOLOGY]: [
    "Development of Tooth (Odontogenesis)",
    "Enamel: Structure & Hypocalcification",
    "Dentin & Pulp Complex",
    "Periodontal Ligament (PDL)",
    "Oral Mucosa Types"
  ],
  [MedicalSubject.TOOTH_MORPHOLOGY]: [
    "Tooth Morphology - Study Guide",
    "Permanent Incisors",
    "Permanent Canines",
    "Premolars: Anatomy & Variations",
    "Molars: Anatomy & Variations",
    "Deciduous Dentition Differences"
  ],
  [MedicalSubject.DENTAL_MATERIALS]: [
    {
      parent: "Dental Material Properties",
      subtopics: [
        "Properties - Summary",
        "Properties - Mechanical",
        "Properties - Thermal",
        "Properties - Rheology",
        "Properties - Chemical & Biological",
        "Properties - Optical"
      ]
    },
    "Impression Materials",
    "Gypsum Products",
    "Investment",
    "Casting",
    {
      parent: "Wax",
      subtopics: [
        "Wax - Detailed Notes",
        "Wax - Summary"
      ]
    },
    {
      parent: "Composite Restorations",
      subtopics: [
        {
          parent: "Composite",
          subtopics: [
            "Composite - Detailed Explanation",
            "Composite - Summary"
          ]
        },
        "Adhesion & Bonding"
      ]
    },
    {
      parent: "Dental Resins & Polymers",
      subtopics: [
        "Denture Base Resins - Summary",
        "Denture Base Resins - Detailed Explanation",
        "Denture Cleansers & Adhesives"
      ]
    },
    {
      parent: "Glass Ionomer Cement (GIC)",
      subtopics: [
        "GIC - Detailed Notes",
        "GIC - Summary"
      ]
    },
    "Dental Cements",
    {
      parent: "Dental Ceramics",
      subtopics: [
        "Dental Ceramics - Detailed Notes",
        "Dental Ceramics - Summary"
      ]
    },
    {
      parent: "Amalgam",
      subtopics: [
        "Amalgam - Detailed Explanation",
        "Amalgam - Summary"
      ]
    },
    {

      parent: "Metals",
      subtopics: [
        "Metals Summary",
        "Alloys",
        "Base Metal Alloys",
        "Wrought Alloys",
        "Noble Metal Alloys"
      ]
    }
  ],
  [MedicalSubject.GENERAL_EMBRYOLOGY]: [
    "General Embryology - Detailed Notes"
  ],
  [MedicalSubject.COMMUNITY_MEDICINE]: [
    "Detailed Notes"
  ],
  // Default fallback for subjects without explicit lists yet
  "default": [
    "General Overview",
    "Key Definitions",
    "Clinical Classifications",
    "Diagnosis & Management",
    "Complications"
  ]
};

export const SUBJECT_ICONS: Record<string, React.ReactNode> = {
  'Head & Neck Anatomy': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10M12 21V3m0 0L9.5 5.5M12 3l2.5 2.5M7 8h10M7 14h10" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6z" opacity="0.5" />
    </svg>
  ),
  Physiology: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12h3l2-4 2 8 2-4h3" />
    </svg>
  ),
  Biochemistry: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  ),
  'Oral Histology': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 10a2 2 0 11-4 0 2 2 0 014 0z" opacity="0.6" />
      <circle cx="10" cy="10" r="1" fill="currentColor" />
    </svg>
  ),
  'Tooth Morphology': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l5 2 5-2M4 12c0 5 3 9 8 9s8-4 8-9" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4c-3 0-4 3-4 5v3h8V9c0-2-1-5-4-5z" />
    </svg>
  ),
  'Dental Materials': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v20" opacity="0.3" />
    </svg>
  ),
  'General Pathology': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 10a2 2 0 11-4 0 2 2 0 014 0z" opacity="0.6" />
    </svg>
  ),
  Pharmacology: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  'Community & Behavioural Sciences': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  'General Medicine': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 9h4" />
    </svg>
  ),
  'General Surgery': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
    </svg>
  ),
  'Oral Pathology': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      <circle cx="15" cy="15" r="4" stroke="currentColor" strokeWidth={1.5} fill="none" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18l3 3" />
    </svg>
  ),
  'Periodontology': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {/* Tooth with gum line emphasized */}
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l5 2 5-2M4 12c0 5 3 9 8 9s8-4 8-9" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4c-3 0-4 3-4 5v3h8V9c0-2-1-5-4-5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 14c2 2 4 1 8 1s6 1 8-1" strokeDasharray="2 2" />
    </svg>
  ),
  'Oral Medicine & Radiology': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth={1.5} strokeDasharray="4 4" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35" />
      <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth={1.5} opacity="0.5" />
    </svg>
  ),
  'Orthodontics': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {/* Tooth with braces brackets */}
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20s-3-4-3-10c0-3 2-6 8-6s8 3 8 6c0 6-3 10-3 10H7z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 10h16" />
      <rect x="7" y="8" width="2" height="4" fill="currentColor" rx="0.5" />
      <rect x="11" y="8" width="2" height="4" fill="currentColor" rx="0.5" />
      <rect x="15" y="8" width="2" height="4" fill="currentColor" rx="0.5" />
    </svg>
  ),
  'Prosthodontics': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {/* Crown/Implant concept */}
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2l-3 4h6l-3-4z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 6v6c0 2 1.5 3 3 3s3-1 3-3V6" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v7m-3 0h6" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 18h6" />
    </svg>
  ),
  'Oral & Maxillofacial Surgery': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {/* Scalpel and Tooth */}
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 5l-2 2-2-2 2-2 2 2zM15 7l-9 9 3 3 9-9" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 12l-2 2" opacity="0.5" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 20l3-3" />
    </svg>
  ),
  'Operative Dentistry & Endodontics': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {/* Drill/Root File */}
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v20" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l6 2-6 2 6 2-6 2 6 2-6 2" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22h4m-4 0H8" />
    </svg>
  ),
  'General Embryology': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {/* Embryo/Cell Division */}
      <circle cx="12" cy="12" r="8" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16M4 12h16" />
      <circle cx="8" cy="8" r="2" strokeWidth={1.5} />
      <circle cx="16" cy="8" r="2" strokeWidth={1.5} />
      <circle cx="8" cy="16" r="2" strokeWidth={1.5} />
      <circle cx="16" cy="16" r="2" strokeWidth={1.5} />
    </svg>
  )
};

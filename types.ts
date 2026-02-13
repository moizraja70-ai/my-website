export enum MedicalSubject {
  ANATOMY = 'Head & Neck Anatomy',
  PHYSIOLOGY = 'Physiology',
  BIOCHEMISTRY = 'Biochemistry',
  PHARMACOLOGY = 'Pharmacology',
  MICROBIOLOGY = 'Microbiology',
  GENERAL_PATHOLOGY = 'General Pathology',
  ORAL_HISTOLOGY = 'Oral Histology',
  TOOTH_MORPHOLOGY = 'Tooth Morphology',
  DENTAL_MATERIALS = 'Dental Materials',
  ORAL_PATHOLOGY = 'Oral Pathology',
  ORAL_MEDICINE_RADIOLOGY = 'Oral Medicine & Radiology',
  PERIODONTOLOGY = 'Periodontology',
  COMMUNITY_MEDICINE = 'Community & Behavioural Sciences',
  PEDIATRICS = 'Pediatrics',
  GENERAL_EMBRYOLOGY = 'General Embryology',
}

export type ViewMode =
  | 'dashboard'
  | 'subject-detail'
  | 'summary'
  | 'quiz'
  | 'question-banks'
  | 'ai-chat'
  | 'admin';

export type ExamStream = 'FCPS';

export type TopicItem =
  | string
  | {
      parent: string;
      subtopics: TopicItem[];
    };

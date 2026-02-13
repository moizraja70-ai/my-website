import { MedicalSubject, ExamStream } from '../types';

// ---------------------------------------------------------------------------
// MCQ Types
// ---------------------------------------------------------------------------

export interface MCQ {
    id?: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
    subject?: string;
    topic?: string;
    difficulty?: string;
}

type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Challenge';

// ---------------------------------------------------------------------------
// Helper: Generate MCQs from MATERIALS_PROPERTIES and other embedded data
// ---------------------------------------------------------------------------

/**
 * Fetch MCQs for a given subject/topic/difficulty.
 * This is a simplified version that returns mock MCQs.
 * In production, this would call the Gemini API or fetch from a database.
 */
export const fetchMCQsForSubject = async (
    subject: MedicalSubject,
    count: number,
    stream: ExamStream,
    topic?: string,
    difficulty?: Difficulty,
): Promise<MCQ[]> => {
    // TODO: Implement actual MCQ fetching logic
    // For now, return empty array - this will be populated by your existing data
    console.log('fetchMCQsForSubject called:', { subject, count, stream, topic, difficulty });
    return [];
};

/**
 * Fetch MCQs (alternative signature for QuickQuizModal)
 */
export const fetchMCQs = async (
    subject: MedicalSubject,
    count: number,
    stream: ExamStream,
    topic?: string,
    difficulty?: Difficulty,
): Promise<MCQ[]> => {
    return fetchMCQsForSubject(subject, count, stream, topic, difficulty);
};

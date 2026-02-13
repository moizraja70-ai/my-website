import { supabase } from './supabaseClient';

// ---------------------------------------------------------------------------
// Quiz stats helpers
// ---------------------------------------------------------------------------

/**
 * Fetch per-subject quiz statistics for a given user.
 *
 * Returns a map keyed by subject name, where each value holds the cumulative
 * `correct` and `incorrect` counts.  Returns an empty object (`{}`) when the
 * user has no stats yet or when an error occurs, matching the original
 * behaviour from the production bundle.
 */
export const fetchQuizStats = async (
  userId: string,
): Promise<Record<string, { correct: number; incorrect: number }> | null> => {
  try {
    const { data, error } = await supabase
      .from('quiz_stats')
      .select('subject, correct, incorrect')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching quiz stats:', error);
      return {};
    }

    return (data || []).reduce<Record<string, { correct: number; incorrect: number }>>(
      (acc, row) => ({
        ...acc,
        [row.subject]: {
          correct: row.correct,
          incorrect: row.incorrect,
        },
      }),
      {},
    );
  } catch (err) {
    console.error('Failed to fetch quiz stats:', err);
    return {};
  }
};

/**
 * Upsert a quiz-stats row for the given user + subject combination.
 *
 * The upsert uses a composite conflict key of `user_id,subject` so that
 * subsequent calls for the same subject simply overwrite the previous
 * counts.  Returns `true` on success, `false` on failure.
 */
export const updateQuizStats = async (
  userId: string,
  subject: string,
  correct: number,
  incorrect: number,
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('quiz_stats')
      .upsert(
        {
          user_id: userId,
          subject,
          correct,
          incorrect,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,subject' },
      );

    if (error) {
      console.error('Error updating quiz stats:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Failed to update quiz stats:', err);
    return false;
  }
};

// ---------------------------------------------------------------------------
// Mock-exam score helpers
// ---------------------------------------------------------------------------

/**
 * Fetch the most recent mock-exam scores for a given user.
 *
 * Returns the last 10 scores ordered chronologically (oldest-first) so that
 * charting components can render a natural left-to-right timeline.  Returns
 * an empty array when the user has no scores or on error.
 */
export const fetchMockScores = async (
  userId: string,
): Promise<{ score: number; total: number; timestamp: number }[] | null> => {
  try {
    const { data, error } = await supabase
      .from('mock_scores')
      .select('score, total, timestamp')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching mock scores:', error);
      return [];
    }

    // The query fetches newest-first; reverse so the array is chronological.
    return (data || []).reverse();
  } catch (err) {
    console.error('Failed to fetch mock scores:', err);
    return [];
  }
};

/**
 * Persist a new mock-exam score row for the given user.
 *
 * Returns `true` on success, `false` on failure.
 */
export const saveMockScore = async (
  userId: string,
  score: number,
  total: number,
  timestamp: number,
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('mock_scores')
      .insert({
        user_id: userId,
        score,
        total,
        timestamp,
      });

    if (error) {
      console.error('Error saving mock score:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Failed to save mock score:', err);
    return false;
  }
};

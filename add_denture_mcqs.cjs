const fs = require('fs');

const mcqFile = 'mcq dentuer base reisn.md';
const tsFile = 'data/dentureBaseResins.ts';

const content = fs.readFileSync(mcqFile, 'utf8');

function parseMCQs(text) {
    const mcqs = [];
    // Split by numbered questions (e.g., "1. ", "50. ")
    const questionBlocks = text.split(/\n(?=\d+\.\s+\*\*)/g);

    for (const block of questionBlocks) {
        if (!block.match(/^\d+\./)) continue;

        try {
            // Extract Question
            const questionMatch = block.match(/^\d+\.\s+\*\*(.+?)\*\*/s);
            if (!questionMatch) continue;
            let question = questionMatch[1].trim();
            // Handle cases where question continues after bold
            const questionRest = block.substring(questionMatch[0].length).split('\n')[0];
            if (questionRest && !questionRest.trim().startsWith('A.')) {
                question += questionRest;
            }

            // Extract Options
            const options = [];
            const optionMatches = block.matchAll(/([A-D])\.\s+(.+)/g);
            for (const match of optionMatches) {
                options.push(match[2].trim());
            }

            // Extract Answer
            let answer = '';
            const answerMatch = block.match(/(?:✅ Correct Answer:|Answer:)\s*([A-D])/i);
            if (answerMatch) {
                answer = answerMatch[1].toUpperCase();
            }

            // Map answer letter to index
            const answerIndex = answer.charCodeAt(0) - 'A'.charCodeAt(0);

            // Extract Explanation
            let explanation = '';
            const reasonMatch = block.match(/(?:Reason:|Why [A-D] is correct \(structured\))([\s\S]+)/i);
            if (reasonMatch) {
                explanation = reasonMatch[1].trim();
                // Clean up explanation if it hits the next question header
                explanation = explanation.replace(/\n[-_]{3,}[\s\S]*/, '').trim();

                // Formatting Cleanup
                explanation = explanation
                    // Fix escaped characters often found in these notes
                    .replace(/\\=/g, '=')
                    .replace(/\\\+/g, '+')
                    .replace(/\\-/g, '-')
                    // Fix "###" headers -> convert to bold with newlines
                    .replace(/###\s*(.+)/g, '\n\n**$1**\n')
                    .replace(/###/g, '') // remove any stray ###
                    // Fix "One-liner (exam):" spacing
                    .replace(/\*\*One-liner \(exam\):\*\*/g, '\n\n**One-liner (exam):**')
                    // Fix bullet points stuck to previous text (add newline)
                    .replace(/([^\n])\s*\*\s*\*\*/g, '$1\n\n* **')
                    // Fix redundant/broken bolding: "** **Text**" -> "**Text**"
                    // We replace "** **" with "**" to keep the start bold marker.
                    .replace(/\*\*\s+\*\*/g, '**')
                    // Remove "Answer: X" / "Reason:" redundancies if they duplicate the standard structure
                    .replace(/(\*\*Answer:\s*[A-D]\s*\*\*)\s*(\n\s*\*\*Reason:\*\*)/gi, '$2')
                    // Final trim and newline normalization
                    .replace(/\n{3,}/g, '\n\n')
                    .trim();
            }

            if (options.length >= 4 && answer) {
                mcqs.push({
                    id: (mcqs.length + 1).toString(),
                    question: question,
                    options: options.slice(0, 4), // Ensure only 4 options
                    correctAnswerIndex: answerIndex,
                    explanation: explanation,
                    difficulty: 'medium' // Default, will override
                });
            }
        } catch (e) {
            console.log("Error parsing block:", block.substring(0, 50), e);
        }
    }
    return mcqs;
}

// Splitting by section headers with bold markers
const sections = content.split(/### \*\*✅ SECTION \d+:/);
const easyText = sections[1];
const intermediateText = sections[2];
const hardText = sections[3] + (sections[4] || ''); // Combine Hard and Impossibly Hard

const easyMCQs = parseMCQs(easyText).map(m => ({ ...m, difficulty: 'easy' }));
const mediumMCQs = parseMCQs(intermediateText).map(m => ({ ...m, difficulty: 'medium' }));
const hardMCQs = parseMCQs(hardText).map(m => ({ ...m, difficulty: 'hard' }));
const allMCQs = [...easyMCQs, ...mediumMCQs, ...hardMCQs];

const tsAppend = `
export const DENTURE_BASE_RESINS_MCQS_EASY = ${JSON.stringify(easyMCQs, null, 2)};
export const DENTURE_BASE_RESINS_MCQS_MEDIUM = ${JSON.stringify(mediumMCQs, null, 2)};
export const DENTURE_BASE_RESINS_MCQS_HARD = ${JSON.stringify(hardMCQs, null, 2)};
export const DENTURE_BASE_RESINS_MCQS_ALL = ${JSON.stringify(allMCQs, null, 2)};
`;

fs.appendFileSync(tsFile, tsAppend, 'utf8');
console.log(`Added ${easyMCQs.length} Easy, ${mediumMCQs.length} Medium, ${hardMCQs.length} Hard MCQs.`);

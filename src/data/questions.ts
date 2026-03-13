// Question generation system for mock tests

export interface Question {
  questionId: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  subject: string;
  explanation: string;
}

// Generate dummy questions for a given subject and count
function generateSubjectQuestions(subject: string, count: number): Question[] {
  const topics: Record<string, string[]> = {
    Physics: [
      'Kinematics', 'Laws of Motion', 'Work, Energy & Power', 'Rotational Motion',
      'Gravitation', 'Oscillations', 'Waves', 'Thermodynamics', 'Electrostatics',
      'Current Electricity', 'Magnetic Effects', 'Electromagnetic Induction',
      'Optics', 'Dual Nature of Matter', 'Atoms and Nuclei', 'Semiconductor Electronics',
    ],
    Chemistry: [
      'Atomic Structure', 'Chemical Bonding', 'States of Matter', 'Thermodynamics',
      'Equilibrium', 'Redox Reactions', 'Organic Chemistry', 'Coordination Compounds',
      'Electrochemistry', 'Chemical Kinetics', 'Surface Chemistry', 'Polymers',
      'Biomolecules', 'Environmental Chemistry', 'Solid State', 'd-Block Elements',
    ],
    Mathematics: [
      'Sets & Relations', 'Trigonometry', 'Complex Numbers', 'Quadratic Equations',
      'Sequences & Series', 'Permutations', 'Binomial Theorem', 'Matrices',
      'Determinants', 'Limits & Continuity', 'Differentiation', 'Integration',
      'Differential Equations', 'Vectors', 'Three-Dimensional Geometry', 'Probability',
    ],
    Biology: [
      'Cell Biology', 'Genetics', 'Ecology', 'Human Physiology', 'Plant Physiology',
      'Reproduction', 'Evolution', 'Biotechnology', 'Microorganisms', 'Biodiversity',
      'Human Health', 'Animal Kingdom', 'Plant Kingdom', 'Biomolecules',
      'Morphology of Plants', 'Anatomy of Plants', 'Digestion', 'Respiration',
      'Excretion', 'Locomotion',
    ],
  };

  const subjectTopics = topics[subject] || topics.Physics;
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const topic = subjectTopics[i % subjectTopics.length];
    const correctAnswer = Math.floor(Math.random() * 4);

    questions.push({
      questionId: i + 1,
      question: `[${subject}] ${topic}: Question ${i + 1} — Which of the following statements about ${topic.toLowerCase()} is correct?`,
      options: [
        `Option A — Statement about ${topic.toLowerCase()} (variant 1)`,
        `Option B — Statement about ${topic.toLowerCase()} (variant 2)`,
        `Option C — Statement about ${topic.toLowerCase()} (variant 3)`,
        `Option D — Statement about ${topic.toLowerCase()} (variant 4)`,
      ],
      correctAnswer,
      subject,
      explanation: `The correct answer is Option ${String.fromCharCode(65 + correctAnswer)}. This relates to the concept of ${topic.toLowerCase()} in ${subject}. In a real exam, a detailed explanation would be provided here.`,
    });
  }

  return questions;
}

// Cache generated questions
const questionCache: Record<string, Question[]> = {};

export function getQuestionsForTest(testId: string): Question[] {
  if (questionCache[testId]) return questionCache[testId];

  let questions: Question[] = [];

  // Parse testId: e.g., mhtcet-physics-paper-1, mhtcet-pcm-paper-1
  const parts = testId.split('-');
  const subjectOrType = parts[1];

  if (subjectOrType === 'pcm') {
    questions = [
      ...generateSubjectQuestions('Physics', 50),
      ...generateSubjectQuestions('Chemistry', 50),
      ...generateSubjectQuestions('Mathematics', 50),
    ];
    // Re-number
    questions.forEach((q, i) => q.questionId = i + 1);
  } else if (subjectOrType === 'pcb') {
    questions = [
      ...generateSubjectQuestions('Physics', 50),
      ...generateSubjectQuestions('Chemistry', 50),
      ...generateSubjectQuestions('Biology', 100),
    ];
    questions.forEach((q, i) => q.questionId = i + 1);
  } else {
    const subjectMap: Record<string, { name: string; count: number }> = {
      physics: { name: 'Physics', count: 50 },
      chemistry: { name: 'Chemistry', count: 50 },
      maths: { name: 'Mathematics', count: 50 },
      biology: { name: 'Biology', count: 100 },
    };
    const sub = subjectMap[subjectOrType];
    if (sub) {
      questions = generateSubjectQuestions(sub.name, sub.count);
    }
  }

  // Add paper variation by using the paper number as seed offset
  const paperNum = parseInt(parts[parts.length - 1]) || 1;
  if (paperNum > 1) {
    // Shuffle questions deterministically based on paper number
    questions = questions.map((q, i) => ({
      ...q,
      question: q.question.replace(`Question ${i + 1}`, `Question ${i + 1} (Set ${paperNum})`),
      correctAnswer: (q.correctAnswer + paperNum - 1) % 4,
    }));
  }

  questionCache[testId] = questions;
  return questions;
}

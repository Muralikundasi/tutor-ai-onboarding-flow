
export interface Question {
  question: string;
  options: string[];
  correct: number;
}

export interface Subject {
  availableGrades: string[];
  category: string;
  questions: Record<string, Question[]>;
}

export const subjectDatabase: Record<string, Subject> = {
  // Elementary Subjects (K-5th)
  "Reading": {
    availableGrades: ["K", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade"],
    category: "elementary",
    questions: {
      "K": [
        {
          question: "Which letter makes the 'mmmm' sound?",
          options: ["B", "M", "D", "P"],
          correct: 1
        },
        {
          question: "What comes at the end of a sentence?",
          options: ["Period (.)", "Comma (,)", "Question (?)", "All sentences end the same"],
          correct: 0
        }
      ],
      "1st Grade": [
        {
          question: "What is a noun?",
          options: ["Action word", "Person, place, or thing", "Describing word", "Connecting word"],
          correct: 1
        },
        {
          question: "Which word rhymes with 'cat'?",
          options: ["Dog", "Hat", "Bird", "Fish"],
          correct: 1
        }
      ],
      "2nd Grade": [
        {
          question: "What is the main idea of a story?",
          options: ["The first sentence", "What the story is mostly about", "The last sentence", "The characters' names"],
          correct: 1
        },
        {
          question: "Which is a complete sentence?",
          options: ["Running fast", "The dog barks loudly", "In the park", "Very happy"],
          correct: 1
        }
      ]
    }
  },

  "Fundamentals of Math": {
    availableGrades: ["K", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade"],
    category: "elementary",
    questions: {
      "K": [
        {
          question: "Count the objects: 🍎🍎🍎 How many apples?",
          options: ["2", "3", "4", "1"],
          correct: 1
        },
        {
          question: "Which number comes after 5?",
          options: ["4", "6", "7", "3"],
          correct: 1
        }
      ],
      "1st Grade": [
        {
          question: "What is 3 + 2?",
          options: ["4", "5", "6", "7"],
          correct: 1
        },
        {
          question: "Which number is bigger: 8 or 5?",
          options: ["8", "5", "They are the same", "Can't tell"],
          correct: 0
        }
      ]
    }
  },

  "Elementary Science": {
    availableGrades: ["K", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade"],
    category: "elementary",
    questions: {
      "K": [
        {
          question: "What do plants need to grow?",
          options: ["Only water", "Sunlight and water", "Only dirt", "Only air"],
          correct: 1
        },
        {
          question: "How many legs does a dog have?",
          options: ["2", "4", "6", "8"],
          correct: 1
        }
      ]
    }
  },

  // Middle School Subjects
  "Biology": {
    availableGrades: ["6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Grade", "11th Grade", "12th Grade"],
    category: "science",
    questions: {
      "6th Grade": [
        {
          question: "What do all living things need to survive?",
          options: ["Only water", "Food, water, air, and shelter", "Only food", "Just sunlight"],
          correct: 1
        },
        {
          question: "What is the basic unit of life?",
          options: ["Organ", "Cell", "Tissue", "Organism"],
          correct: 1
        }
      ],
      "7th Grade": [
        {
          question: "What is photosynthesis?",
          options: ["How animals breathe", "How plants make food using sunlight", "How water moves through plants", "How plants reproduce"],
          correct: 1
        },
        {
          question: "Which organelle is known as the powerhouse of the cell?",
          options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
          correct: 1
        }
      ]
    }
  },

  "Pre-Algebra": {
    availableGrades: ["6th Grade", "7th Grade", "8th Grade"],
    category: "math",
    questions: {
      "6th Grade": [
        {
          question: "What is 15% of 200?",
          options: ["25", "30", "35", "40"],
          correct: 1
        },
        {
          question: "Solve: 2x + 4 = 10",
          options: ["x = 2", "x = 3", "x = 4", "x = 6"],
          correct: 1
        }
      ]
    }
  },

  // High School Subjects
  "Algebra 1": {
    availableGrades: ["8th Grade", "9th Grade", "10th Grade"],
    category: "math",
    questions: {
      "8th Grade": [
        {
          question: "Solve for x: x + 7 = 15",
          options: ["x = 8", "x = 22", "x = 7", "x = 15"],
          correct: 0
        },
        {
          question: "What is the coefficient in the term 5x?",
          options: ["x", "5", "5x", "1"],
          correct: 1
        }
      ],
      "9th Grade": [
        {
          question: "What is the slope of the line y = 3x + 2?",
          options: ["2", "3", "3x", "5"],
          correct: 1
        },
        {
          question: "Factor: x² - 9",
          options: ["(x - 3)(x - 3)", "(x + 3)(x - 3)", "x(x - 9)", "Cannot be factored"],
          correct: 1
        }
      ]
    }
  },

  "Chemistry": {
    availableGrades: ["9th Grade", "10th Grade", "11th Grade", "12th Grade"],
    category: "science",
    questions: {
      "9th Grade": [
        {
          question: "What is the chemical symbol for water?",
          options: ["H2O", "CO2", "NaCl", "O2"],
          correct: 0
        },
        {
          question: "How many protons does carbon have?",
          options: ["4", "6", "8", "12"],
          correct: 1
        }
      ]
    }
  },

  "Physics": {
    availableGrades: ["10th Grade", "11th Grade", "12th Grade"],
    category: "science",
    questions: {
      "10th Grade": [
        {
          question: "What is the formula for force?",
          options: ["F = ma", "F = mv", "F = mgh", "F = 1/2mv²"],
          correct: 0
        },
        {
          question: "What is the speed of light?",
          options: ["300,000 km/s", "3,000,000 km/s", "30,000 km/s", "3,000 km/s"],
          correct: 0
        }
      ]
    }
  },

  // College/Adult Subjects
  "Accounting": {
    availableGrades: ["College"],
    category: "business",
    questions: {
      "College": [
        {
          question: "What is the fundamental accounting equation?",
          options: ["Assets = Liabilities + Equity", "Revenue = Expenses + Profit", "Debits = Credits", "Income = Assets - Liabilities"],
          correct: 0
        },
        {
          question: "When recording a sale on credit, which accounts are affected?",
          options: ["Cash and Revenue", "Accounts Receivable and Revenue", "Inventory and Cash", "Assets and Liabilities"],
          correct: 1
        }
      ]
    }
  },

  "Computer Programming": {
    availableGrades: ["9th Grade", "10th Grade", "11th Grade", "12th Grade", "College"],
    category: "technology",
    questions: {
      "9th Grade": [
        {
          question: "What does HTML stand for?",
          options: ["Home Tool Markup Language", "HyperText Markup Language", "Hyperlinks and Text Markup Language", "High Tech Modern Language"],
          correct: 1
        },
        {
          question: "Which of these is a programming language?",
          options: ["Python", "Word", "Excel", "PowerPoint"],
          correct: 0
        }
      ],
      "College": [
        {
          question: "What is the time complexity of binary search?",
          options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
          correct: 1
        },
        {
          question: "Which data structure uses LIFO principle?",
          options: ["Queue", "Stack", "Array", "Tree"],
          correct: 1
        }
      ]
    }
  }
};

export const getAllSubjects = (): string[] => {
  return Object.keys(subjectDatabase).sort();
};

export const getAvailableGrades = (subject: string): string[] => {
  return subjectDatabase[subject]?.availableGrades || [];
};

export const getQuestions = (subject: string, grade: string): Question[] => {
  return subjectDatabase[subject]?.questions[grade] || [];
};

export const getSubjectCategory = (subject: string): string => {
  return subjectDatabase[subject]?.category || 'general';
};

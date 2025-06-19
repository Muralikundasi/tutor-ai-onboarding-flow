
export interface Question {
  question: string;
  options: string[];
  correct: number;
}

export interface GoalCategory {
  subjects: Record<string, string[]>;
  questions: Record<string, Record<string, Question[]>>;
}

export const learningGoals: Record<string, GoalCategory> = {
  academics: {
    subjects: {
      // Elementary (K-5th)
      "Reading": ["K", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade"],
      "Fundamentals of Math": ["K", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade"],
      "Elementary Science": ["K", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade"],
      
      // Middle School (6th-8th)
      "English Language Arts": ["6th Grade", "7th Grade", "8th Grade"],
      "Pre-Algebra": ["7th Grade", "8th Grade"],
      "Biology": ["6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Grade", "11th Grade", "12th Grade"],
      
      // High School (9th-12th)
      "Algebra 1": ["8th Grade", "9th Grade", "10th Grade"],
      "Chemistry": ["9th Grade", "10th Grade", "11th Grade", "12th Grade"],
      "Spanish": ["6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Grade", "11th Grade", "12th Grade"],
      
      // College/Adult
      "Accounting": ["College"],
      "Computer Programming": ["9th Grade", "10th Grade", "11th Grade", "12th Grade", "College"]
    },
    questions: {
      "Reading": {
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
        ]
      },
      "Fundamentals of Math": {
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
        ]
      },
      "Algebra 1": {
        "9th Grade": [
          {
            question: "Solve for x: x + 7 = 15",
            options: ["x = 8", "x = 22", "x = 7", "x = 15"],
            correct: 0
          },
          {
            question: "What is the slope of the line y = 3x + 2?",
            options: ["2", "3", "3x", "5"],
            correct: 1
          }
        ]
      }
    }
  },

  "test-prep": {
    subjects: {
      "SAT Prep": ["10th Grade", "11th Grade", "12th Grade"],
      "ACT Prep": ["10th Grade", "11th Grade", "12th Grade"],
      "PSAT Prep": ["9th Grade", "10th Grade", "11th Grade"],
      "AP Biology": ["11th Grade", "12th Grade"],
      "AP Chemistry": ["11th Grade", "12th Grade"],
      "AP Calculus AB": ["11th Grade", "12th Grade"],
      "AP English Language": ["11th Grade"],
      "GRE Prep": ["College"],
      "MCAT Prep": ["College"]
    },
    questions: {
      "SAT Prep": {
        "11th Grade": [
          {
            question: "If 3x + 5 = 20, what is the value of x?",
            options: ["3", "5", "15", "25"],
            correct: 1
          },
          {
            question: "Which word best completes the sentence: 'The scientist's _____ approach yielded surprising results.'",
            options: ["methodical", "careless", "rushed", "biased"],
            correct: 0
          }
        ]
      },
      "AP Biology": {
        "11th Grade": [
          {
            question: "What is the primary function of mitochondria?",
            options: ["Protein synthesis", "Energy production", "DNA storage", "Waste disposal"],
            correct: 1
          },
          {
            question: "During which phase of mitosis do chromosomes align at the cell's equator?",
            options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
            correct: 1
          }
        ]
      }
    }
  },

  enrichment: {
    subjects: {
      "Creative Writing": ["6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Grade", "11th Grade", "12th Grade"],
      "Art History": ["9th Grade", "10th Grade", "11th Grade", "12th Grade", "College"],
      "Music Theory": ["6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Grade", "11th Grade", "12th Grade"],
      "Debate": ["6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Grade", "11th Grade", "12th Grade"],
      "Robotics": ["6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Grade", "11th Grade", "12th Grade"],
      "Web Design": ["9th Grade", "10th Grade", "11th Grade", "12th Grade", "College"]
    },
    questions: {
      "Creative Writing": {
        "9th Grade": [
          {
            question: "Which literary device is used in 'The wind whispered through the trees'?",
            options: ["Metaphor", "Personification", "Alliteration", "Hyperbole"],
            correct: 1
          },
          {
            question: "What is the most effective way to start a compelling story?",
            options: ["With detailed character descriptions", "In the middle of action", "With the story's moral", "With a long backstory"],
            correct: 1
          }
        ]
      },
      "Robotics": {
        "8th Grade": [
          {
            question: "What is a sensor in robotics?",
            options: ["A power source", "A device that detects environmental changes", "A motor", "A programming language"],
            correct: 1
          },
          {
            question: "Which programming concept is most important for robot movement?",
            options: ["Variables", "Loops", "Functions", "All of the above"],
            correct: 3
          }
        ]
      }
    }
  }
};

export const getGoalSubjects = (goal: string): Record<string, string[]> => {
  return learningGoals[goal]?.subjects || {};
};

export const getSubjectGrades = (goal: string, subject: string): string[] => {
  return learningGoals[goal]?.subjects[subject] || [];
};

export const getGoalQuestions = (goal: string, subject: string, grade: string): Question[] => {
  return learningGoals[goal]?.questions[subject]?.[grade] || [];
};

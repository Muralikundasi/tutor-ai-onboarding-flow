import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { OnboardingData } from '../OnboardingFlow';
import GoalSelector from '../ui/GoalSelector';
import RoleToggle from '../ui/RoleToggle';
import SubjectAutocomplete from '../ui/SubjectAutocomplete';
import { getAvailableGrades, getQuestions } from '../../data/subjectDatabase';

interface DiagnosticScreenProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const DiagnosticScreen: React.FC<DiagnosticScreenProps> = ({ data, updateData, onNext }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showQuestions, setShowQuestions] = useState(false);

  const allGrades = [
    { id: 'K', label: 'K' },
    { id: '1st Grade', label: '1st' },
    { id: '2nd Grade', label: '2nd' },
    { id: '3rd Grade', label: '3rd' },
    { id: '4th Grade', label: '4th' },
    { id: '5th Grade', label: '5th' },
    { id: '6th Grade', label: '6th' },
    { id: '7th Grade', label: '7th' },
    { id: '8th Grade', label: '8th' },
    { id: '9th Grade', label: '9th' },
    { id: '10th Grade', label: '10th' },
    { id: '11th Grade', label: '11th' },
    { id: '12th Grade', label: '12th' },
    { id: 'College', label: 'College' }
  ];

  // Get available grades for the selected subject
  const getAvailableGradesForSubject = () => {
    if (!data.subject) return allGrades;
    
    const availableGradeIds = getAvailableGrades(data.subject);
    return allGrades.filter(grade => availableGradeIds.includes(grade.id));
  };

  useEffect(() => {
    if (data.goal && data.subject && data.gradeLevel) {
      // First try to get questions from the database
      const dbQuestions = getQuestions(data.subject, data.gradeLevel);
      
      let questionsToSet: any[] = [];
      if (dbQuestions.length > 0) {
        questionsToSet = dbQuestions;
      } else {
        // Fallback to universal questions
        questionsToSet = generateUniversalQuestions(data.subject, data.gradeLevel, data.goal, data.role);
      }
      
      setQuestions(questionsToSet);
      
      // Show questions if we have any
      if (questionsToSet.length > 0) {
        setShowQuestions(true);
        setCurrentQuestion(0);
        setSelectedAnswers([]);
      }
    }
  }, [data.goal, data.subject, data.gradeLevel, data.role]);

  // Clear grade selection if it's not available for the new subject
  useEffect(() => {
    if (data.subject && data.gradeLevel) {
      const availableGradeIds = getAvailableGrades(data.subject);
      if (!availableGradeIds.includes(data.gradeLevel)) {
        updateData({ gradeLevel: '' });
      }
    }
  }, [data.subject]);

  const generateUniversalQuestions = (subject: string, grade: string, goal: string, role: string) => {
    // Universal question bank with intelligent selection
    const questionBank = {
      mathematics: {
        elementary: [
          {
            question: "What is 7 + 5?",
            options: ["10", "11", "12", "13"],
            correct: 2
          },
          {
            question: "Which shape has 3 sides?",
            options: ["Circle", "Square", "Triangle", "Rectangle"],
            correct: 2
          }
        ],
        middle: [
          {
            question: "Solve for x: 2x + 4 = 12",
            options: ["x = 2", "x = 4", "x = 6", "x = 8"],
            correct: 1
          },
          {
            question: "What is 25% of 80?",
            options: ["15", "20", "25", "30"],
            correct: 1
          }
        ],
        high: [
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
        ],
        college: [
          {
            question: "What is the derivative of x³?",
            options: ["x²", "3x²", "3x³", "x³/3"],
            correct: 1
          }
        ]
      },
      science: {
        elementary: [
          {
            question: "What do plants need to grow?",
            options: ["Only water", "Sunlight and water", "Only soil", "Only air"],
            correct: 1
          },
          {
            question: "How many legs does a spider have?",
            options: ["6", "8", "10", "12"],
            correct: 1
          }
        ],
        middle: [
          {
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Cytoplasm"],
            correct: 1
          },
          {
            question: "What gas do plants absorb from the air?",
            options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
            correct: 1
          }
        ],
        high: [
          {
            question: "What type of bond forms between Na and Cl?",
            options: ["Covalent", "Ionic", "Metallic", "Hydrogen"],
            correct: 1
          },
          {
            question: "What is the chemical formula for water?",
            options: ["H2O", "CO2", "NaCl", "O2"],
            correct: 0
          }
        ],
        college: [
          {
            question: "What is the pH of a neutral solution?",
            options: ["0", "7", "14", "1"],
            correct: 1
          }
        ]
      },
      language: {
        elementary: [
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
        middle: [
          {
            question: "What is the main idea of a paragraph?",
            options: ["The first sentence", "What the paragraph is mostly about", "The last sentence", "The longest sentence"],
            correct: 1
          },
          {
            question: "Which is a complete sentence?",
            options: ["Running quickly", "The dog barked loudly", "In the park", "Very happy today"],
            correct: 1
          }
        ],
        high: [
          {
            question: "What literary device is used in 'The wind whispered'?",
            options: ["Metaphor", "Personification", "Alliteration", "Hyperbole"],
            correct: 1
          },
          {
            question: "What is a thesis statement?",
            options: ["The conclusion", "The main argument", "A quote", "A question"],
            correct: 1
          }
        ],
        college: [
          {
            question: "What is the difference between denotation and connotation?",
            options: ["Same meaning", "Literal vs. implied meaning", "Formal vs. informal", "Old vs. new meaning"],
            correct: 1
          }
        ]
      }
    };

    // Determine grade level category
    const gradeLevel = ['K', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade'].includes(grade) ? 'elementary' :
                     ['6th Grade', '7th Grade', '8th Grade'].includes(grade) ? 'middle' :
                     ['9th Grade', '10th Grade', '11th Grade', '12th Grade'].includes(grade) ? 'high' : 'college';

    // Map subject to category
    const subjectCategory = subject.toLowerCase().includes('math') || subject.toLowerCase().includes('algebra') || 
                           subject.toLowerCase().includes('calculus') || subject.toLowerCase().includes('geometry') ? 'mathematics' :
                           subject.toLowerCase().includes('science') || subject.toLowerCase().includes('biology') || 
                           subject.toLowerCase().includes('chemistry') || subject.toLowerCase().includes('physics') ? 'science' : 'language';

    // Get questions or fallback to generic
    const questions = questionBank[subjectCategory]?.[gradeLevel] || questionBank.language.middle;
    
    return questions.slice(0, 2);
  };

  const handleGoalChange = (goal: string) => {
    updateData({ goal });
  };

  const handleRoleChange = (role: 'Student' | 'Parent') => {
    updateData({ role });
  };

  const handleSubjectChange = (subject: string) => {
    updateData({ subject });
  };

  const handleGradeChange = (grade: string) => {
    updateData({ gradeLevel: grade });
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSkipQuestion = () => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = -1; // -1 indicates skipped
    setSelectedAnswers(newAnswers);
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      updateData({ answers: selectedAnswers });
      onNext();
    }
  };

  const canProceedToNext = () => {
    return selectedAnswers[currentQuestion] !== undefined;
  };

  const getGoalDisplayName = (goal: string) => {
    const names: Record<string, string> = {
      'academics': 'Academic Support',
      'test-prep': 'Test Preparation',
      'enrichment': 'Skill Building'
    };
    return names[goal] || goal;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Let's personalize your learning experience
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We'll create a customized learning plan based on your goals and current level.
        </p>
      </motion.div>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
        {!showQuestions ? (
          <div className="space-y-8">
            {/* Learning Goal Context */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-6 text-center">
                What brings you here today?
              </label>
              <GoalSelector selectedGoal={data.goal} onChange={handleGoalChange} />
            </div>

            {/* Role Context */}
            {data.goal && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <RoleToggle selectedRole={data.role} onChange={handleRoleChange} />
              </motion.div>
            )}

            {/* Universal Subject Selection */}
            {data.goal && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  What subject would you like help with? *
                </label>
                <SubjectAutocomplete 
                  value={data.subject} 
                  onChange={handleSubjectChange}
                  placeholder="Start typing any subject..."
                />
              </motion.div>
            )}

            {/* Filtered Grade Selection */}
            {data.subject && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  What grade level?
                </label>
                <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
                  {getAvailableGradesForSubject().map((grade) => (
                    <button
                      key={grade.id}
                      onClick={() => handleGradeChange(grade.id)}
                      className={`p-3 rounded-lg border-2 font-medium transition-all ${
                        data.gradeLevel === grade.id
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {grade.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-blue-800">
                  Quick Assessment
                </h3>
                <div className="text-sm text-blue-600">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
              </div>
              <div className="text-sm text-blue-600 mb-4">
                {getGoalDisplayName(data.goal)} • {data.subject} • {data.gradeLevel}
              </div>

              <div className="bg-white rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-800 mb-4">
                  {questions[currentQuestion]?.question}
                </h4>
                <div className="space-y-3">
                  {questions[currentQuestion]?.options.map((option: string, index: number) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSkipQuestion}
                className="flex-1 py-4 px-6 rounded-xl font-semibold text-lg border-2 border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                Skip Question
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!canProceedToNext()}
                onClick={handleNextQuestion}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                  canProceedToNext()
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 hover:shadow-lg text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Generate My Learning Profile'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DiagnosticScreen;

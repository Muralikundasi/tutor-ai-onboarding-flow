
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { OnboardingData } from '../OnboardingFlow';

interface DiagnosticScreenProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const subjects = [
  'Algebra 1', 'Algebra 2', 'Geometry', 'Pre-Calculus', 'Calculus',
  'Biology', 'Chemistry', 'Physics', 'English', 'History', 'SAT Prep'
];

const gradeLevels = [
  '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade',
  '11th Grade', '12th Grade', 'College'
];

const questions = {
  'Algebra 1': [
    {
      question: "What is the value of x in the equation: 2x + 5 = 13?",
      options: ["x = 4", "x = 6", "x = 8", "x = 9"],
      correct: 0
    },
    {
      question: "Which of these represents a linear equation?",
      options: ["y = x²", "y = 2x + 3", "y = x³", "y = 1/x"],
      correct: 1
    },
    {
      question: "If y = 3x - 2, what is y when x = 4?",
      options: ["y = 10", "y = 12", "y = 14", "y = 16"],
      correct: 0
    }
  ],
  'Biology': [
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
      correct: 1
    },
    {
      question: "Which process do plants use to make food?",
      options: ["Respiration", "Photosynthesis", "Fermentation", "Digestion"],
      correct: 1
    }
  ]
};

const DiagnosticScreen: React.FC<DiagnosticScreenProps> = ({ data, updateData, onNext }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showQuestions, setShowQuestions] = useState(false);

  const handleSubjectChange = (subject: string) => {
    updateData({ subject });
    setShowQuestions(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
  };

  const handleGradeChange = (grade: string) => {
    updateData({ gradeLevel: grade });
    if (data.subject) {
      setShowQuestions(true);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    const availableQuestions = questions[data.subject as keyof typeof questions] || [];
    if (currentQuestion < availableQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      updateData({ answers: selectedAnswers });
      onNext();
    }
  };

  const canProceed = showQuestions && selectedAnswers[currentQuestion] !== undefined;
  const availableQuestions = questions[data.subject as keyof typeof questions] || [];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Let's find your starting point
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          We'll ask a few quick questions to understand your current level and create a personalized learning plan just for you.
        </p>
      </motion.div>

      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
        {!showQuestions ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Subject Selection */}
            <div>
              <label className="block text-lg font-semibold text-slate-700 mb-4">
                What subject would you like help with?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {subjects.map((subject) => (
                  <motion.button
                    key={subject}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSubjectChange(subject)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      data.subject === subject
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-medium">{subject}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Grade Level Selection */}
            {data.subject && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-lg font-semibold text-slate-700 mb-4">
                  What's your current grade level?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {gradeLevels.map((grade) => (
                    <motion.button
                      key={grade}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGradeChange(grade)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        data.gradeLevel === grade
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-medium text-center">{grade}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-800">
                Question {currentQuestion + 1} of {availableQuestions.length}
              </h3>
              <div className="text-sm text-slate-500">
                {data.subject} • {data.gradeLevel}
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-medium text-slate-800 mb-4">
                {availableQuestions[currentQuestion]?.question}
              </h4>
              <div className="space-y-3">
                {availableQuestions[currentQuestion]?.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-coral-500 bg-coral-50 text-coral-700'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!canProceed}
              onClick={handleNextQuestion}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                canProceed
                  ? 'bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white shadow-lg'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {currentQuestion < availableQuestions.length - 1 ? 'Next Question' : 'See My Results'}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DiagnosticScreen;


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { OnboardingData } from '../OnboardingFlow';
import SubjectAutocomplete from '../ui/SubjectAutocomplete';
import { getAvailableGrades, getQuestions } from '../../data/subjectDatabase';

interface DiagnosticScreenProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const allGrades = [
  'K', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade',
  '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade',
  '11th Grade', '12th Grade', 'College'
];

const DiagnosticScreen: React.FC<DiagnosticScreenProps> = ({ data, updateData, onNext }) => {
  const [availableGrades, setAvailableGrades] = useState<string[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    if (data.subject) {
      const grades = getAvailableGrades(data.subject);
      setAvailableGrades(grades);
      setShowQuestions(false);
      setCurrentQuestion(0);
      setSelectedAnswers([]);
    }
  }, [data.subject]);

  useEffect(() => {
    if (data.subject && data.gradeLevel) {
      const questionSet = getQuestions(data.subject, data.gradeLevel);
      if (questionSet.length > 0) {
        setQuestions(questionSet);
        setShowQuestions(true);
      }
    }
  }, [data.subject, data.gradeLevel]);

  const handleSubjectChange = (subject: string) => {
    updateData({ subject, gradeLevel: '' });
  };

  const handleGradeChange = (grade: string) => {
    updateData({ gradeLevel: grade });
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
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

  const canShowResults = () => {
    return data.subject && data.gradeLevel && selectedAnswers.length >= 2;
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
          Let's find your starting point
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We'll ask a few quick questions to understand your current level and create a personalized learning plan just for you.
        </p>
      </motion.div>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
        {!showQuestions ? (
          <div className="space-y-8">
            {/* Subject Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                What subject would you like help with? *
              </label>
              <SubjectAutocomplete
                value={data.subject}
                onChange={handleSubjectChange}
                placeholder="Search for a subject..."
              />
            </div>

            {/* Grade Level Selection */}
            {data.subject && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  What grade level?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availableGrades.map((grade) => (
                    <motion.button
                      key={grade}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGradeChange(grade)}
                      className={`p-4 rounded-xl border-2 transition-all font-medium ${
                        data.gradeLevel === grade
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {grade}
                    </motion.button>
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
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Question {currentQuestion + 1} of {questions.length}
              </h3>
              <div className="text-sm text-gray-500">
                {data.subject} • {data.gradeLevel}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
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

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!canProceedToNext()}
              onClick={handleNextQuestion}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                canProceedToNext()
                  ? 'bg-gradient-to-r from-pink-500 to-orange-500 hover:shadow-lg text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'See My Results'}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DiagnosticScreen;


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { OnboardingData } from '../OnboardingFlow';
import GoalSelector from '../ui/GoalSelector';
import RoleToggle from '../ui/RoleToggle';
import { getGoalSubjects, getSubjectGrades, getGoalQuestions } from '../../data/learningGoals';

interface DiagnosticScreenProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const DiagnosticScreen: React.FC<DiagnosticScreenProps> = ({ data, updateData, onNext }) => {
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);
  const [availableGrades, setAvailableGrades] = useState<string[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    if (data.goal) {
      const subjects = getGoalSubjects(data.goal);
      setAvailableSubjects(Object.keys(subjects));
      // Reset subject and grade when goal changes
      updateData({ subject: '', gradeLevel: '' });
      setShowQuestions(false);
    }
  }, [data.goal]);

  useEffect(() => {
    if (data.goal && data.subject) {
      const grades = getSubjectGrades(data.goal, data.subject);
      setAvailableGrades(grades);
      // Reset grade when subject changes
      updateData({ gradeLevel: '' });
      setShowQuestions(false);
    }
  }, [data.goal, data.subject]);

  useEffect(() => {
    if (data.goal && data.subject && data.gradeLevel) {
      const questionSet = getGoalQuestions(data.goal, data.subject, data.gradeLevel);
      if (questionSet.length > 0) {
        setQuestions(questionSet);
        setShowQuestions(true);
        setCurrentQuestion(0);
        setSelectedAnswers([]);
      }
    }
  }, [data.goal, data.subject, data.gradeLevel]);

  const handleGoalChange = (goal: string) => {
    updateData({ goal });
  };

  const handleRoleChange = (role: 'child' | 'myself') => {
    updateData({ role });
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateData({ subject: e.target.value });
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateData({ gradeLevel: e.target.value });
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
    return data.goal && data.subject && data.gradeLevel && selectedAnswers.length >= 2;
  };

  const getGoalDisplayName = (goal: string) => {
    const names: Record<string, string> = {
      'academics': 'Academic Support',
      'test-prep': 'Test Preparation',
      'enrichment': 'Enrichment Learning'
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
          What's the learning goal today?
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We'll personalize everything based on your learning goals and create a plan that works for you.
        </p>
      </motion.div>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
        {!showQuestions ? (
          <div className="space-y-8">
            {/* Goal Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-6 text-center">
                Choose your learning goal
              </label>
              <GoalSelector selectedGoal={data.goal} onChange={handleGoalChange} />
            </div>

            {/* Role Toggle */}
            {data.goal && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <RoleToggle selectedRole={data.role} onChange={handleRoleChange} />
              </motion.div>
            )}

            {/* Subject and Grade Selection */}
            {data.goal && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Select a subject
                  </label>
                  <div className="relative">
                    <select
                      value={data.subject}
                      onChange={handleSubjectChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none appearance-none bg-white text-lg"
                    >
                      <option value="">Select a subject...</option>
                      {availableSubjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Select grade level
                  </label>
                  <div className="relative">
                    <select
                      value={data.gradeLevel}
                      onChange={handleGradeChange}
                      disabled={!data.subject}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none appearance-none bg-white text-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select grade level...</option>
                      {availableGrades.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  </div>
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


import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lightbulb, Brain, TrendingUp } from 'lucide-react';
import { OnboardingData } from '../OnboardingFlow';

interface ValueReportScreenProps {
  data: OnboardingData;
  onNext: () => void;
}

const ValueReportScreen: React.FC<ValueReportScreenProps> = ({ data, onNext }) => {
  // Calculate a mock proficiency score based on answers
  const totalQuestions = data.answers.length;
  const correctAnswers = data.answers.filter((answer, index) => {
    // Mock correct answers (in real app, would compare with actual correct answers)
    return answer === 0 || answer === 1; // Simplified logic
  }).length;
  
  const proficiencyScore = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 75;

  const strengths = [
    'Basic Equations',
    'Problem Solving Fundamentals',
    'Mathematical Reasoning'
  ];

  const growthAreas = [
    'Advanced Algebraic Concepts',
    'Word Problem Strategies',
    'Complex Equation Solving'
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Here's what we learned
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Based on your responses, we've created a personalized assessment of your current skills and learning opportunities.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Proficiency Gauge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Your {data.subject} Proficiency
          </h3>
          
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#e2e8f0"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - proficiencyScore / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800">{proficiencyScore}%</div>
                <div className="text-sm text-slate-600">Current Level</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              <TrendingUp className="w-4 h-4 mr-2" />
              {proficiencyScore >= 80 ? 'Strong Foundation' : proficiencyScore >= 60 ? 'Good Progress' : 'Room to Grow'}
            </div>
          </div>
        </motion.div>

        {/* AI Insights Module */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 border border-blue-100"
        >
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              Powered by AI
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            AI Session Summary
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="text-sm text-slate-700">
                    <strong>Learning Style:</strong> Visual and step-by-step approach works best
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="text-sm text-slate-700">
                    <strong>Optimal Session Length:</strong> 45-60 minutes for maximum retention
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="text-sm text-slate-700">
                    <strong>Focus Areas:</strong> Practice problems and real-world applications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Strengths and Growth Areas */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center mb-6">
            <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
            <h3 className="text-xl font-bold text-slate-800">Your Strengths</h3>
          </div>
          
          <div className="space-y-4">
            {strengths.map((strength, index) => (
              <motion.div
                key={strength}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center p-4 bg-green-50 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-slate-700 font-medium">{strength}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center mb-6">
            <Lightbulb className="w-6 h-6 text-amber-500 mr-3" />
            <h3 className="text-xl font-bold text-slate-800">Areas for Growth</h3>
          </div>
          
          <div className="space-y-4">
            {growthAreas.map((area, index) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="flex items-center p-4 bg-amber-50 rounded-lg"
              >
                <Lightbulb className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                <span className="text-slate-700 font-medium">{area}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white font-semibold text-lg px-12 py-4 rounded-xl shadow-lg transition-all"
        >
          See Tutors & Plans
        </motion.button>
        <p className="text-slate-600 mt-4">
          Find the perfect tutor match based on your assessment results
        </p>
      </motion.div>
    </div>
  );
};

export default ValueReportScreen;


import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lightbulb, Brain, TrendingUp } from 'lucide-react';
import { OnboardingData } from '../OnboardingFlow';

interface ValueReportScreenProps {
  data: OnboardingData;
  onNext: () => void;
}

const ValueReportScreen: React.FC<ValueReportScreenProps> = ({ data, onNext }) => {
  // Calculate proficiency score based on answers
  const correctAnswers = data.answers.filter((answer, index) => {
    return answer === 0 || answer === 1;
  }).length;
  
  const proficiencyScore = data.answers.length > 0 
    ? Math.round((correctAnswers / data.answers.length) * 100) 
    : 72;

  const getGoalDisplayName = (goal: string) => {
    const names: Record<string, string> = {
      'academics': 'Academic Support',
      'test-prep': 'Test Preparation', 
      'enrichment': 'Skill Building'
    };
    return names[goal] || goal;
  };

  const getRoleText = (role: 'child' | 'myself') => {
    return role === 'child' ? "your child's" : "your";
  };

  // Universal insights generation based on subject and context
  const getUniversalInsights = () => {
    const subjectLower = data.subject.toLowerCase();
    
    let strengths = ['Problem-solving approach', 'Learning foundation', 'Conceptual understanding'];
    let growth = ['Advanced applications', 'Practice consistency', 'Study strategies'];

    // Customize based on subject category
    if (subjectLower.includes('math') || subjectLower.includes('algebra') || subjectLower.includes('calculus')) {
      strengths = ['Number sense', 'Logical reasoning', 'Mathematical concepts'];
      growth = ['Advanced problem solving', 'Formula application', 'Word problems'];
    } else if (subjectLower.includes('science') || subjectLower.includes('biology') || subjectLower.includes('chemistry')) {
      strengths = ['Scientific thinking', 'Observation skills', 'Core concepts'];
      growth = ['Experimental design', 'Data analysis', 'Advanced theories'];
    } else if (subjectLower.includes('english') || subjectLower.includes('writing') || subjectLower.includes('literature')) {
      strengths = ['Reading comprehension', 'Communication skills', 'Vocabulary'];
      growth = ['Critical analysis', 'Essay structure', 'Advanced writing'];
    }

    // Adjust for goal context
    if (data.goal === 'test-prep') {
      growth = growth.map(item => `Test ${item.toLowerCase()}`);
    } else if (data.goal === 'enrichment') {
      strengths.push('Creative thinking');
      growth = ['Advanced exploration', 'Independent research', 'Leadership skills'];
    }

    return { strengths, growth };
  };

  const getUniversalAIFeatures = () => {
    const features = {
      'academics': {
        title: 'AI Learning Support',
        items: [
          'Automatic session transcripts and key moment bookmarks',
          'AI-generated progress summaries and learning insights',
          'Personalized homework help and practice recommendations',
          'Real-time learning analytics and improvement tracking'
        ]
      },
      'test-prep': {
        title: 'AI Test Prep Features',
        items: [
          'AI-generated practice tests tailored to your level',
          'Smart score analysis and improvement recommendations',
          'Adaptive study schedules based on test dates',
          'Real-time performance tracking and strategy adjustments'
        ]
      },
      'enrichment': {
        title: 'AI Enrichment Tools',
        items: [
          'Advanced learning pathway recommendations',
          'Creative project ideas and skill challenges',
          'Independent research guidance and resources',
          'Real-time skill development tracking and certificates'
        ]
      }
    };

    return features[data.goal as keyof typeof features] || features.academics;
  };

  const { strengths, growth } = getUniversalInsights();
  const aiFeatures = getUniversalAIFeatures();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {data.role === 'child' ? "Your child's" : "Your"} Learning Profile
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Based on {getRoleText(data.role)} {data.subject} assessment for {getGoalDisplayName(data.goal).toLowerCase()} goals.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Universal Proficiency Gauge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {data.role === 'child' ? 'Your Child\'s' : 'Your'} {data.subject} Proficiency
          </h3>
          
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="#3b82f6"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - proficiencyScore / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{proficiencyScore}%</div>
                <div className="text-sm text-gray-600">Current Level</div>
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

        {/* Goal-Aware AI Preview Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl shadow-lg p-8"
        >
          <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm font-semibold mb-4 inline-block">
            🚀 Powered by AI
          </div>
          
          <h3 className="text-xl font-semibold mb-4">{aiFeatures.title}</h3>
          <p className="mb-4 text-blue-100">What you'll get with our AI-enhanced tutoring:</p>
          
          <div className="bg-white bg-opacity-10 rounded-lg p-4 space-y-2">
            {aiFeatures.items.map((item, index) => (
              <div key={index} className="flex items-start text-sm">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Universal Strengths and Growth Areas */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center mb-6">
            <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
            <h3 className="text-xl font-bold text-gray-800">
              Current Strengths
            </h3>
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
                <span className="text-gray-700 font-medium">{strength}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center mb-6">
            <Lightbulb className="w-6 h-6 text-amber-500 mr-3" />
            <h3 className="text-xl font-bold text-gray-800">
              {data.goal === 'test-prep' ? 'Focus Areas' : 'Growth Opportunities'}
            </h3>
          </div>
          
          <div className="space-y-4">
            {growth.map((area, index) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="flex items-center p-4 bg-amber-50 rounded-lg"
              >
                <Lightbulb className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{area}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Universal Call to Action */}
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
          className="bg-gradient-to-r from-pink-500 to-orange-500 hover:shadow-lg text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all"
        >
          Ready to accelerate {data.role === 'child' ? 'your child\'s' : 'your'} progress?
        </motion.button>
        <p className="text-gray-600 mt-4">
          Get matched with expert tutors based on your assessment results
        </p>
      </motion.div>
    </div>
  );
};

export default ValueReportScreen;

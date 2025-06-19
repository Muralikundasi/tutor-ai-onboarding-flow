
import React from 'react';
import { motion } from 'framer-motion';

interface GoalSelectorProps {
  selectedGoal: string;
  onChange: (goal: string) => void;
}

const GoalSelector: React.FC<GoalSelectorProps> = ({ selectedGoal, onChange }) => {
  const goals = [
    {
      id: 'academics',
      icon: '📚',
      title: 'Academics',
      description: 'Core subjects & homework help'
    },
    {
      id: 'test-prep',
      title: 'Test Prep',
      icon: '📝',
      description: 'SAT, ACT, AP & standardized tests'
    },
    {
      id: 'enrichment',
      icon: '🌟',
      title: 'Enrichment',
      description: 'Advanced skills & exploration'
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {goals.map((goal) => (
        <motion.button
          key={goal.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChange(goal.id)}
          className={`p-6 rounded-xl border-2 transition-all text-left ${
            selectedGoal === goal.id
              ? 'border-blue-600 bg-blue-50 shadow-lg'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          <div className="text-3xl mb-3">{goal.icon}</div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">{goal.title}</h3>
          <p className="text-sm text-gray-600">{goal.description}</p>
        </motion.button>
      ))}
    </div>
  );
};

export default GoalSelector;

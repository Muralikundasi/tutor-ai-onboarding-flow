
import React from 'react';
import { motion } from 'framer-motion';

interface RoleToggleProps {
  selectedRole: 'Student' | 'Parent';
  onChange: (role: 'Student' | 'Parent') => void;
}

const RoleToggle: React.FC<RoleToggleProps> = ({ selectedRole, onChange }) => {
  return (
    <div className="flex flex-col items-center space-y-3">
      <label className="text-lg font-semibold text-gray-700">I am?</label>
      <div className="relative bg-gray-200 rounded-full p-1 flex">
        <motion.div
          className="absolute top-1 bottom-1 bg-blue-600 rounded-full shadow-sm"
          initial={false}
          animate={{
            left: selectedRole === 'Student' ? '4px' : '50%',
            width: selectedRole === 'Student' ? 'calc(50% - 4px)' : 'calc(50% - 4px)'
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        <button
          onClick={() => onChange('child')}
          className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors ${
            selectedRole === 'Student' ? 'text-white' : 'text-gray-700'
          }`}
        >
          Student
        </button>
        <button
          onClick={() => onChange('Parent')}
          className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors ${
            selectedRole === 'Parent' ? 'text-white' : 'text-gray-700'
          }`}
        >
          Parent
        </button>
      </div>
    </div>
  );
};

export default RoleToggle;

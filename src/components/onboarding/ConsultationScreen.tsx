import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, User, CheckCircle } from 'lucide-react';
import { OnboardingData } from '../OnboardingFlow';

interface ConsultationScreenProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const ConsultationScreen: React.FC<ConsultationScreenProps> = ({ data, updateData, onNext }) => {
  const [formData, setFormData] = useState({
    name: data.studentName || '',
    phone: data.phoneNumber || '',
    email: data.email || ''
  });

  const getGoalDisplayName = (goal: string) => {
    const names: Record<string, string> = {
      'academics': 'Academic Support',
      'test-prep': 'Test Preparation', 
      'enrichment': 'Skill Building'
    };
    return names[goal] || goal;
  };

  const getGoalSpecificBenefit = (goal: string) => {
    switch(goal) {
      case 'test-prep':
        return 'Strategic test timeline and score improvement plan';
      case 'enrichment': 
        return 'Advanced pathway design and skill development plan';
      default:
        return 'Custom learning plan designed for sustained academic growth';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'name') {
      updateData({ studentName: value });
    } else if (field === 'phone') {
      updateData({ phoneNumber: value });
    } else if (field === 'email') {
      updateData({ email: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Consultation request submitted:', {
      ...data,
      ...formData
    });
    // Move to success screen
    onNext();
  };

  const isFormValid = formData.name.trim() && formData.phone.trim();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Ready to accelerate {data.role === 'Parent' ? "your child's" : "your"} progress?
        </h1>
        <p className="text-xl text-gray-600">
          Let's build a personalized {data.subject} learning plan for {getGoalDisplayName(data.goal).toLowerCase()}.
        </p>
      </motion.div>

      {/* Context-Aware Value Proposition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50 rounded-xl p-6 mb-8 border-l-4 border-blue-500"
      >
        <h3 className="text-lg font-semibold mb-4 text-blue-800">
          Your free consultation will include:
        </h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">
              Review of {data.role === 'Parent' ? "your child's" : "your"} {data.subject} diagnostic results in detail
            </span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">
              {getGoalSpecificBenefit(data.goal)}
            </span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">
              Match with expert {data.subject} tutors specialized in {data.gradeLevel} level
            </span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">
              Live demonstration of our AI-powered learning platform
            </span>
          </div>
        </div>
      </motion.div>

      {/* Context Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8"
      >
        <h4 className="font-semibold text-gray-800 mb-3">Your Learning Profile Summary:</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Goal:</span> {getGoalDisplayName(data.goal)}
          </div>
          <div>
            <span className="font-medium text-gray-600">Learner:</span> {data.role === 'Parent' ? 'My Child' : 'Student'}
          </div>
          <div>
            <span className="font-medium text-gray-600">Subject:</span> {data.subject}
          </div>
          <div>
            <span className="font-medium text-gray-600">Level:</span> {data.gradeLevel}
          </div>
        </div>
      </motion.div>

      {/* Role-Aware Contact Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            {data.role === 'Parent' ? "Student's Name" : "Your Name"} *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
            placeholder={data.role === 'Parent' ? "Enter student's name" : "Enter your name"}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            {data.role === 'Parent' ? "Parent/Guardian Phone Number" : "Your Phone Number"} *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
            placeholder="(555) 123-4567"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address (Optional)
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
            placeholder="your.email@example.com"
          />
        </div>

        <motion.button
          type="submit"
          disabled={!isFormValid}
          whileHover={isFormValid ? { scale: 1.02 } : {}}
          whileTap={isFormValid ? { scale: 0.98 } : {}}
          className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all ${
            isFormValid
              ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Schedule My Free {data.subject} Consultation
        </motion.button>

        <p className="text-center text-sm text-gray-600">
          We'll contact you within 24 hours to schedule your consultation.
          <br />
          No obligation • Free expert consultation • Personalized recommendations
        </p>
      </motion.form>
    </div>
  );
};

export default ConsultationScreen;

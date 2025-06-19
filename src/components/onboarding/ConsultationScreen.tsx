
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Clock, Users, Star } from 'lucide-react';
import { OnboardingData } from '../OnboardingFlow';

interface ConsultationScreenProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

const ConsultationScreen: React.FC<ConsultationScreenProps> = ({ data, updateData }) => {
  const [studentName, setStudentName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ studentName?: string; phoneNumber?: string }>({});

  const getGoalDisplayName = (goal: string) => {
    const names: Record<string, string> = {
      'academics': 'Academic Support',
      'test-prep': 'Test Preparation',
      'enrichment': 'Enrichment Learning'
    };
    return names[goal] || goal;
  };

  const getGoalBenefits = () => {
    const benefits = {
      'academics': [
        'Review diagnostic results and identify key learning gaps',
        'Match with a subject-expert tutor who understands your needs',
        'Create a personalized study plan that fits your schedule',
        'See our AI-powered homework help tools in action'
      ],
      'test-prep': [
        'Analyze diagnostic results and create a strategic timeline',
        'Match with a test prep specialist with proven score improvements',
        'Design a personalized score improvement plan with target goals',
        'See our AI-powered practice test generation system'
      ],
      'enrichment': [
        'Review assessment and identify advanced learning opportunities',
        'Match with an expert tutor who specializes in enrichment learning',
        'Design an advanced pathway for skill development and exploration',
        'See our AI-powered project and challenge recommendation system'
      ]
    };

    return benefits[data.goal as keyof typeof benefits] || benefits.academics;
  };

  const validateForm = () => {
    const newErrors: { studentName?: string; phoneNumber?: string } = {};
    
    if (!studentName.trim()) {
      newErrors.studentName = data.role === 'child' ? 'Student name is required' : 'Your name is required';
    }
    
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\(?[\d\s\-\(\)]{10,}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      updateData({ studentName, phoneNumber });
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-white rounded-2xl shadow-lg p-12"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Your consultation is scheduled!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We've saved your personalized {getGoalDisplayName(data.goal).toLowerCase()} assessment for <strong>{studentName}</strong>. 
            A learning specialist will call <strong>{phoneNumber}</strong> within 24 hours to discuss your customized tutoring plan.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>What's Next:</strong> Our expert will review your diagnostic results, match you with the perfect tutor 
              for {getGoalDisplayName(data.goal).toLowerCase()}, and show you how our AI-powered platform can accelerate your learning journey.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const benefits = getGoalBenefits();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Let's build {data.role === 'child' ? 'your child\'s' : 'your'} personalized plan
        </h1>
        <p className="text-xl text-gray-600">
          Based on {data.role === 'child' ? 'your child\'s' : 'your'} {data.subject} assessment, we're ready to connect you with the perfect {getGoalDisplayName(data.goal).toLowerCase()} plan.
        </p>
      </motion.div>

      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center mb-8"
      >
        <div className="bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-gray-700 font-medium">4.9/5 on Trustpilot</span>
            <div className="text-gray-500">•</div>
            <span className="text-gray-600">500K+ students helped</span>
          </div>
        </div>
      </motion.div>

      {/* Value Proposition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-50 rounded-xl p-6 mb-8"
      >
        <h3 className="text-lg font-semibold mb-4 text-center">Your free consultation will include:</h3>
        <ul className="space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 font-bold mr-3 mt-1">✓</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              {data.role === 'child' ? 'Student\'s Name' : 'Your Name'} *
            </label>
            <input 
              type="text" 
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className={`w-full p-4 border-2 rounded-lg focus:outline-none transition-colors ${
                errors.studentName 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder={data.role === 'child' ? 'Enter student\'s name' : 'Enter your name'}
            />
            {errors.studentName && (
              <p className="mt-1 text-sm text-red-600">{errors.studentName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              {data.role === 'child' ? 'Parent/Guardian Phone Number' : 'Phone Number'} *
            </label>
            <input 
              type="tel" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full p-4 border-2 rounded-lg focus:outline-none transition-colors ${
                errors.phoneNumber 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="(555) 123-4567"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
            )}
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold py-4 px-8 rounded-lg hover:shadow-lg transition-all"
          >
            Request My Free Consultation
          </motion.button>
        </form>

        <div className="flex items-center justify-center mt-6 text-gray-500 text-sm">
          <Clock className="w-4 h-4 mr-2" />
          <span>Takes less than 30 seconds • No spam, ever</span>
        </div>
      </motion.div>

      {/* Social Proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center"
      >
        <div className="flex items-center justify-center space-x-8 text-gray-600 text-sm">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span>500K+ students taught</span>
          </div>
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            <span>Background-checked tutors</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>Available 24/7</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConsultationScreen;

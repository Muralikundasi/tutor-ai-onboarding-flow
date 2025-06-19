
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Check, Shield, Clock, Users } from 'lucide-react';
import { OnboardingData } from '../OnboardingFlow';

interface PlansScreenProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

const plans = [
  {
    name: 'Value',
    price: '$45',
    period: 'per session',
    description: 'Perfect for getting started',
    features: [
      '1-on-1 tutoring sessions',
      'Subject-specific help',
      'Progress tracking',
      'Homework assistance'
    ],
    highlight: false
  },
  {
    name: 'Most Popular',
    price: '$65',
    period: 'per session',
    description: 'Our most comprehensive plan',
    features: [
      'Everything in Value',
      'AI-powered insights',
      'Custom study plans',
      'Priority tutor matching',
      '24/7 chat support'
    ],
    highlight: true
  },
  {
    name: 'Premium',
    price: '$85',
    period: 'per session',
    description: 'For serious academic goals',
    features: [
      'Everything in Most Popular',
      'Multiple subject access',
      'Parent progress reports',
      'Test prep strategies',
      'College counseling'
    ],
    highlight: false
  }
];

const PlansScreen: React.FC<PlansScreenProps> = ({ data, updateData }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      updateData({ email });
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-auto"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Your report has been saved!
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            We've sent your personalized assessment and matched tutors to <strong>{email}</strong>. 
            Check your inbox to start your learning journey.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>Next Steps:</strong> A Varsity Tutors learning specialist will contact you within 24 hours to schedule your first session.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          The right plan and the right tutor for you
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Based on your {data.subject} assessment, we've selected the best tutoring options to help you reach your academic goals.
        </p>
      </motion.div>

      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center mb-12"
      >
        <div className="bg-white rounded-full px-6 py-3 shadow-lg border border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-slate-700 font-medium">4.9/5 on Trustpilot</span>
            <div className="text-slate-500">•</div>
            <span className="text-slate-600">15,000+ students helped</span>
          </div>
        </div>
      </motion.div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`relative bg-white rounded-2xl shadow-xl p-8 ${
              plan.highlight 
                ? 'ring-2 ring-coral-500 transform scale-105' 
                : ''
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-coral-500 to-coral-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Recommended for You
                </div>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
                <span className="text-slate-600 ml-2">{plan.period}</span>
              </div>
              <p className="text-slate-600">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                plan.highlight
                  ? 'bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white shadow-lg'
                  : 'border-2 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Choose {plan.name}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Email Capture Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-center text-white"
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 mr-3" />
            <h3 className="text-2xl font-bold">Save Your Personalized Report</h3>
          </div>
          
          <p className="text-blue-100 mb-8 text-lg">
            Get your complete {data.subject} assessment, matched tutors, and exclusive learning resources sent to your email.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-6 py-4 rounded-xl text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-coral-500 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all whitespace-nowrap"
            >
              Save & See My Tutors
            </motion.button>
          </form>

          <div className="flex items-center justify-center mt-6 text-blue-100 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>Takes less than 30 seconds • No spam, ever</span>
          </div>
        </div>
      </motion.div>

      {/* Social Proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="mt-12 text-center"
      >
        <div className="flex items-center justify-center space-x-8 text-slate-600">
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            <span>500K+ students taught</span>
          </div>
          <div className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            <span>Background-checked tutors</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            <span>Available 24/7</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlansScreen;

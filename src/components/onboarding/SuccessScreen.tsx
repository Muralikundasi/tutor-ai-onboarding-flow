
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, Mail, MessageCircle, Star, Users, Award } from 'lucide-react';
import { OnboardingData } from '../OnboardingFlow';

interface SuccessScreenProps {
  data: OnboardingData;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ data }) => {
  const getGoalDisplayName = (goal: string) => {
    const names: Record<string, string> = {
      'academics': 'Academic Support',
      'test-prep': 'Test Preparation',
      'enrichment': 'Skill Building'
    };
    return names[goal] || goal;
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-3xl mx-auto"
      >
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          You're all set!
        </h1>
        <p className="text-xl text-slate-600 mb-8">
          Thank you for scheduling your free {data.subject} consultation. 
          We're excited to help {data.role === 'Parent' ? 'your child' : 'you'} succeed!
        </p>

        {/* What's Next Section */}
        <div className="bg-blue-50 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-semibold text-blue-800 mb-6">
            What happens next?
          </h3>
          
          <div className="grid gap-6 text-left">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">
                  Confirmation call within 2 hours
                </h4>
                <p className="text-slate-600">
                  A learning specialist will call {data.phoneNumber} to confirm your consultation time and answer any initial questions.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">
                  Deep dive into {data.subject} assessment results
                </h4>
                <p className="text-slate-600">
                  We'll review {data.role === 'Parent' ? "your child's" : "your"} diagnostic results and identify specific areas for improvement.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">
                  Personalized {data.subject} learning plan
                </h4>
                <p className="text-slate-600">
                  We'll create a customized roadmap for {getGoalDisplayName(data.goal).toLowerCase()} based on {data.role === 'Parent' ? "your child's" : "your"} specific needs.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">
                  Get connected with an expert {data.subject} tutor
                </h4>
                <p className="text-slate-600">
                  We'll match you with a specialist who understands {data.gradeLevel} level concepts and your learning style.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-slate-200 pt-8 mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Need to reach us?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2 text-slate-600">
              <Phone className="w-5 h-5" />
              <span>(888) 888-0446</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <Mail className="w-5 h-5" />
              <span>support@varsitytutors.com</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <MessageCircle className="w-5 h-5" />
              <span>Live chat available 24/7</span>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="bg-slate-50 rounded-lg p-6">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-slate-600">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span className="font-medium">100,000+ families helped</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="font-medium">4.9/5 rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span className="font-medium">Trusted since 2007</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessScreen;

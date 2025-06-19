
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DiagnosticScreen from './onboarding/DiagnosticScreen';
import ValueReportScreen from './onboarding/ValueReportScreen';
import PlansScreen from './onboarding/PlansScreen';

export type OnboardingData = {
  subject: string;
  gradeLevel: string;
  answers: number[];
  email?: string;
};

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    subject: '',
    gradeLevel: '',
    answers: [],
  });

  const updateData = (data: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "easeInOut" as const,
    duration: 0.5
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-slate-600">Step {currentStep} of 3</div>
            <div className="text-sm text-slate-600">{Math.round((currentStep / 3) * 100)}% Complete</div>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full"
              initial={{ width: "33%" }}
              animate={{ width: `${(currentStep / 3) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Screen Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {currentStep === 1 && (
            <DiagnosticScreen 
              data={onboardingData} 
              updateData={updateData} 
              onNext={nextStep} 
            />
          )}
          {currentStep === 2 && (
            <ValueReportScreen 
              data={onboardingData} 
              onNext={nextStep} 
            />
          )}
          {currentStep === 3 && (
            <PlansScreen 
              data={onboardingData} 
              updateData={updateData} 
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingFlow;

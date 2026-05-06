"use client";
import { motion, AnimatePresence } from "framer-motion";

import React, { useState } from "react";
import StepIndicator from "./StepIndicator";
import Step2 from "./Step2";
import Step1 from "./Step1";

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const handleFormTitle = () => {
    switch (currentStep) {
      case 2:
        return "Registered address";
      case 3:
        return "Billing address";
      default:
        return "Company profile";
    }
  };

  const totalSteps = 3;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step2 formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step2 formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg mx-auto overflow-hidden dark:bg-gray-900"
    >
      <h2 className="text-lg md:text-xl font-semibold text-[#414F62] mb-4 dark:text-gray-100">
        {handleFormTitle()}
      </h2>
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {currentStep === 1 ? (
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep((s) => Math.min(totalSteps, s + 1))}
            className="flex-1 px-6 py-2 bg-violet-600 text-white rounded-md cursor-pointer hover:bg-violet-700 transition-colors"
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="flex justify-between mt-8 gap-3">
          <button
            onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
            className="flex-1 px-6 py-2 border-2 border-neutral-900 rounded-md
                  text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentStep((s) => Math.min(totalSteps, s + 1))}
            disabled={currentStep === totalSteps}
            className="flex-1 px-6 py-2 bg-violet-600 text-white rounded-md
                    cursor-pointer hover:bg-violet-700 transition-colors disabled:opacity-50"
          >
            {currentStep === totalSteps ? "Save" : "Continue"}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default MultiStepForm;

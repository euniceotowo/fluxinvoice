"use client";
import { motion } from "framer-motion";

interface StepperProps {
  currentStep?: number;
  totalSteps?: number;
  className?: string;
}

function Stepper({ totalSteps = 1, currentStep = 1, className }: StepperProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <div
            key={step}
            className={`relative w-full h-1 overflow-hidden rounded-lg bg-gray-100 ${className}`}
          >
            {/* Completed steps (no animation) */}
            {isCompleted && (
              <div className="absolute inset-0 rounded-lg bg-[#5E2A8C]" />
            )}

            {/* Current step (animated loading) */}
            {isCurrent && (
              <motion.div
                className="absolute top-0 left-0 h-full rounded-lg bg-[#5E2A8C]"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;

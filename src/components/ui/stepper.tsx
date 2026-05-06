"use client";

import React from "react";

export interface StepItem {
  title: string;
  [key: string]: any;
}

interface StepperProps {
  steps?: (string | StepItem)[];
  activeStep: number;
  setActiveStep: (step: number) => void;
}

function Stepper({ steps = [], activeStep, setActiveStep }: StepperProps) {
  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <div className="w-full">
      <div className="flex gap-2">
        {steps.map((step, index) => {
          const label = typeof step === "string" ? step : step.title;
          return (
            <div
              key={index}
              aria-label={`step of ${label}`}
              className={`w-16 sm:w-21 h-1 transition ease-in-out duration-300 ${index <= activeStep! ? " bg-primary-500" : "bg-border-primary"} rounded-lg `}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Stepper;

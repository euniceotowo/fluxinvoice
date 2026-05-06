"use client";

import React, { useState } from "react";
import Image from "next/image";
import BusinessIllustration from "@/components/ui/business_illustration";
import freelanceIllustration from "@/../public/images/freelancerillu.png";
import ContractorIllustration from "@/../public/images/Contractor Illustration.png";
import { RegistrationFormData } from "../RegistrationWizard";

interface Step4Props {
  formData: RegistrationFormData;
  updateFormData: (data: Partial<RegistrationFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const accountTypes = [
  {
    id: "business",
    name: "Business",
    icon: <BusinessIllustration />,
    description: "For companies and organizations",
  },
  {
    id: "freelancer",
    name: "Freelancer",
    icon: (
      <Image
        src={freelanceIllustration}
        alt="Freelancer Illustration"
        width={150}
        height={150}
        className="object-contain"
      />
    ),
    description: "For independent professionals",
  },
  {
    id: "contractor",
    name: "Contractor",
    icon: (
      <Image
        src={ContractorIllustration.src}
        alt="Contractor Illustration"
        width={ContractorIllustration.width}
        height={ContractorIllustration.height}
        className="object-contain"
      />
    ),
    description: "For contract workers",
  },
];

export default function Step4AccountType({
  formData,
  updateFormData,
  onNext,
  onBack,
}: Step4Props) {
  const [selectedType, setSelectedType] = useState<string>(
    formData.accountType || "",
  );

  const handleContinue = () => {
    if (selectedType) {
      updateFormData({ accountType: selectedType });
      onNext();
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-gray-900 text-3xl md:text-[2.5rem] font-bold mb-2 tracking-[-2%]">
          Select account type
        </h2>
        <p className="text-gray-600 text-base">
          Choose an account type that best suits your usecase
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {accountTypes.map((type) => (
          <div key={type.id} className="flex flex-col items-center">
            <div
              className={`w-24 h-24 md:w-32 md:h-32 p-4 cursor-pointer transition-all border-2 flex items-center justify-center rounded-full ${
                selectedType === type.id
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              {type.icon}
            </div>
            <h3 className="mt-3 text-sm font-medium text-gray-900 md:text-base">
              {type.name}
            </h3>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="w-1/3 py-4 rounded-xl font-semibold text-[#5E2A8C] border-2 border-[#5E2A8C] hover:bg-gray-50 transition-all"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!selectedType}
          className="flex-1 py-4 bg-[#5E2A8C] text-white rounded-xl font-semibold hover:bg-[#4E2275] transition-all disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

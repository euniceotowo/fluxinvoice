"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import BusinessIllustration from "@/components/ui/business_illustration";
import Image from "next/image";
import Stepper from "@/components/features/auth/Stepper";
import { useRouter } from "next/navigation";
import freelanceIllustration from "@/../public/images/freelancerillu.png";
import ContractorIllustration from "@/../public/images/Contractor Illustration.png";

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

export default function VestRollAccountSelection() {
  const [selectedType, setSelectedType] = useState<string>("");
  const router = useRouter();

  return (
    <div className="max-w-md">
      {/* Progress Indicator */}
      <Stepper currentStep={4} totalSteps={5} />
      <div className="mt-6 md:mt-8">
        <h2 className="mb-2 text-2xl font-bold text-gray-900 lg:text-3xl text-balance">
          Select account type
        </h2>
        <p className="mb-8 text-gray-600 lg:mb-12">
          Choose an account type that best suits your usecase
        </p>

        {/* Account Type Cards */}
        <div className="flex justify-center gap-6 mb-8 lg:gap-8 lg:mb-12">
          {accountTypes.map((type) => (
            <div key={type.id} className="flex flex-col items-center">
              <div
                className={`w-24 h-24 lg:w-32 lg:h-32 p-4 cursor-pointer transition-all border-2 flex items-center justify-center ${
                  selectedType === type.id
                    ? " border-primary-500"
                    : "hover:bg-gray-50 border-gray-200"
                } rounded-full`}
                onClick={() => {
                  console.log("Selected:", type.id);
                  setSelectedType(type.id);
                }}
              >
                <div className="flex items-center justify-center">
                  {type.icon}
                </div>
              </div>
              <h3 className="mt-3 text-sm font-medium text-center text-gray-900 lg:text-base">
                {type.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <Button
          className="w-full h-[56px] bg-[#5E2A8C] hover:bg-[#4E2275] text-white py-3 lg:py-4 text-base lg:text-lg font-medium rounded-lg disabled:bg-[#5E2A8C]/70 cursor-not-allowed"
          disabled={!selectedType}
          onClick={() => {
            const existingData = JSON.parse(
              localStorage.getItem("registrationData") || "{}",
            );
            localStorage.setItem(
              "registrationData",
              JSON.stringify({
                ...existingData,
                accountType: selectedType,
                step: 4,
              }),
            );
            router.push(`/onboarding?accountType=${selectedType}`);
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

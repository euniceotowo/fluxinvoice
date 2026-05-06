"use client";
import React, { useState, useMemo } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import Image from "next/image";
import left from "@/../public/images/Left.png";
import mobileLogo from "@/../public/logo/mologo.png";
import Stepper from "@/components/features/auth/Stepper";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

interface PasswordRequirements {
  minLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

interface RequirementItemProps {
  met: boolean;
  text: string;
}

interface PasswordPageProps {
  currentStep?: number;
  totalSteps?: number;
  onNext?: (data: { password: string }) => void;
  onBack?: () => void;
}

const RequirementItem: React.FC<RequirementItemProps> = ({ met, text }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
          met ? "bg-primary-500" : "bg-white border-2 border-gray-200"
        }`}
      >
        {met && <Check size={14} className="text-white" />}
      </div>
      <span className={`text-sm ${met ? "text-gray-900" : "text-gray-600"}`}>
        {text}
      </span>
    </div>
  );
};

export default function PasswordPage({
  currentStep = 2,
  totalSteps = 5,
  onNext,
  onBack,
}: PasswordPageProps) {
  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("registrationData");
      return data ? JSON.parse(data).businessEmail : "";
    }
    return "";
  });
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { clearError, resetPassword, isLoading, error } = useAuth();
  const { error: toastError } = useToast();
  const router = useRouter();

  const requirements = useMemo<PasswordRequirements>(() => {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*]/.test(password),
    };
  }, [password]);

  const allRequirementsMet = Object.values(requirements).every(Boolean);
  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;
  const canSubmit = allRequirementsMet && passwordsMatch;

  const handleSubmit = async () => {
    clearError();
    if (canSubmit) {
      const existingData = JSON.parse(
        localStorage.getItem("registrationData") || "{}",
      );
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          ...existingData,
          password,
          step: 2,
        }),
      );

      try {
        await resetPassword(password, email, "create");
        router.push("/verify-email");
      } catch (err) {
        toastError(error || "Password creation failed");
      }
    }
  };

  return (
    <div className="px-5">
      <div className="w-full space-y-6 md:space-y-8">
        {/* Progress Indicator */}
        <Stepper totalSteps={totalSteps} currentStep={currentStep} />

        {/* Form */}
        <div className="flex flex-col ">
          <div className="mb-8 space-y-2">
            <h2 className="text-gray-900 text-3xl md:text-[2.5rem] font-bold mb-2 tracking-[-2%]">
              Add a password
            </h2>
            <p className="text-gray-600 text-[16px] w-[440px]">
              Create a secure password to access your VestRoll account for
              subsequent login
            </p>
          </div>

          <div className="space-y-6 ">
            {/* New Password Field */}
            <div>
              <label
                htmlFor="new-password"
                className="block text-[12px] font-medium text-gray-900 mb-2"
              >
                New password
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-4 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E2A8C] focus:border-[#5E2A8C]"
                  aria-describedby="password-requirements"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-400 transform -translate-y-1/2 right-4 top-1/2 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-[12px] font-medium text-gray-900 mb-2"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-4 py-4 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E2A8C] focus:border-[#5E2A8C]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute text-gray-400 transform -translate-y-1/2 right-4 top-1/2 hover:text-gray-600"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div
              id="password-requirements"
              className="pt-2 space-y-3"
              role="list"
            >
              <RequirementItem
                met={requirements.minLength}
                text="Minimum of 8 characters"
              />
              <RequirementItem
                met={requirements.hasUppercase}
                text="At least one uppercase letter (A-Z)"
              />
              <RequirementItem
                met={requirements.hasNumber}
                text="At least one number (0-9)"
              />
              <RequirementItem
                met={requirements.hasSpecial}
                text="At least one special character (!@#$%^&*)"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              {onBack && currentStep > 0 && (
                <button
                  onClick={onBack}
                  className="w-1/3 py-4 rounded-xl font-semibold text-[#5E2A8C] border-2 border-[#5E2A8C] hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`${onBack && currentStep > 0 ? "w-2/3" : "w-full"} py-4 rounded-xl font-semibold text-white transition-all ${
                  canSubmit
                    ? "bg-[#5E2A8C] shadow-lg hover:shadow-xl hover:bg-[#4E2275] cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                aria-label="Create password"
              >
                Create password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

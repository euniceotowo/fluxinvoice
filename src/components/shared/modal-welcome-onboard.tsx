"use client";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export default function ModalWelcomeOnboard({
  open = true,
}: {
  open: boolean;
}) {
  const [isOpen, setOpen] = useState(open);
  const router = useRouter();

  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-white border border-gray-200 rounded-2xl p-8">
        <button
          onClick={() => setOpen(false)}
          className="bg-transparent border-0 cursor-pointer"
        >
          <X className="size-8 text-gray-900" />
        </button>

        <AlertDialogHeader className="max-w-2xs text-center! m-auto">
          <Image
            src="/done.svg"
            alt="success"
            width={120}
            height={120}
            className="mx-auto mb-5 mt-12"
          />
          <AlertDialogTitle className="font-bold text-[28px] text-gray-900">
            Welcome Onboard!
          </AlertDialogTitle>
          <AlertDialogDescription className="font-medium text-xs mx-10 text-gray-600">
            Experience Fast, Secure Crypto & Fiat Payroll & Invoicing with
            VestRoll
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-8 justify-center!">
          <AlertDialogAction
            className="bg-[#5E2A8C] hover:bg-[#4E2275] w-full text-base  text-white rounded-[12px] h-14 font-medium 
        
          "
            onClick={() => {
              setOpen(false);
              router.push("/dashboard");
            }}
          >
            Go to dashboard
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

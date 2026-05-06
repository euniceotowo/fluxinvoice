import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/components/providers/provider";
import Modal from "@/components/shared/modal/Modal";

export const metadata: Metadata = {
  title: "Vestroll Payroll System",
  description:
    "Enterprise Payroll management web platform built with real-time analytics, cryptocurrency integration, and AI insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-text-primary antialiased">
        <ReduxProvider>
          <Modal />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}

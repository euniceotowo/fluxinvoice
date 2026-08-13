import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReduxProvider } from "@/components/providers/provider";
import Modal from "@/components/shared/modal/Modal";

export const metadata: Metadata = {
  title: {
    default: "Fluxinvoice",
    template: "%s · Fluxinvoice",
  },
  description:
    "Create polished invoices, track payment progress, and stay organized without the clutter of traditional finance tools.",
  keywords: [
    "invoicing",
    "payments",
    "invoice automation",
    "cross-border payments",
    "freelancers",
    "fluxinvoice",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://fluxinvoice.com",
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Fluxinvoice",
    title: "Fluxinvoice",
    description:
      "Invoices that feel calm, clear, and ready to send. Track payment progress and get paid faster.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fluxinvoice",
    description:
      "Invoices that feel calm, clear, and ready to send. Track payment progress and get paid faster.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
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

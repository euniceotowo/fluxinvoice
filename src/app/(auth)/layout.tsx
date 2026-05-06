import AuthLayer from "@/components/features/auth/AuthLayer";
import { ThemeProvider } from "@/components/providers/theme-provider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
      <AuthLayer>{children}</AuthLayer>
    </ThemeProvider>
  );
}

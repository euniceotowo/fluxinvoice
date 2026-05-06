"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { flushSync } from "react-dom";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative flex items-center h-10 w-[72px] rounded-full bg-gray-100 p-1 dark:bg-gray-800 opacity-50">
        <div className="flex w-full items-center justify-between px-1.5">
          <Sun className="h-4 w-4 text-gray-400" />
          <Moon className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    );
  }

  const toggleTheme = async (e: React.MouseEvent) => {
    const isDark = theme === "dark";
    const nextTheme = isDark ? "light" : "dark";

    if (!(document as any).startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = (document as any).startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: isDark
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)",
        },
      );
    });
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center h-10 w-[72px] rounded-full bg-gray-100 p-1 dark:bg-[#1A1D21] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 shadow-inner"
      aria-label="Toggle theme"
    >
      {/* Sliding Background */}
      <motion.div
        className="absolute h-8 w-8 rounded-full bg-white shadow-md"
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      />

      <div className="relative flex w-full items-center justify-between px-2 z-10">
        <Sun
          className={`h-4 w-4 transition-colors duration-200 ${
            !isDark ? "text-[#111827]" : "text-gray-400"
          }`}
        />
        <Moon
          className={`h-4 w-4 transition-colors duration-200 ${
            isDark ? "text-[#111827]" : "text-gray-400"
          }`}
        />
      </div>
    </button>
  );
}

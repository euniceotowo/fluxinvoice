"use client";
import { motion } from "framer-motion";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { flushSync } from "react-dom";

const themes = [
  {
    id: "light",
    name: "Light",
    preview: "/theme-light.svg",
  },
  {
    id: "dark",
    name: "Dark",
    preview: "/theme-dark.svg",
  },
];

export function AppearanceSection() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeChange = async (e: React.MouseEvent, newTheme: string) => {
    if (theme === newTheme) return;

    if (!(document as any).startViewTransition) {
      setTheme(newTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const isDark = theme === "dark";

    const transition = (document as any).startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
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

  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      <div>
        <h2 className="text-lg font-medium">Appearance</h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {themes.map((themeOption) => (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            key={themeOption.id}
            onClick={(e) => handleThemeChange(e, themeOption.id)}
            className={`flex flex-col items-center gap-3 p-4 rounded-lg border transition-colors ${
              theme === themeOption.id
                ? "border-purple-500 bg-purple-50 dark:bg-purple-900/10 dark:border-purple-500"
                : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            }`}
          >
            <div className="relative">
              <Image
                src={themeOption.preview}
                alt={`${themeOption.name} theme preview`}
                width={64}
                height={48}
                className="rounded-md"
              />
              {theme === themeOption.id && (
                <motion.div
                  layoutId="activeThemeRing"
                  className="absolute inset-0 ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-gray-900 rounded-md"
                />
              )}
            </div>
            <span className="text-sm font-medium dark:text-gray-200">
              {themeOption.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

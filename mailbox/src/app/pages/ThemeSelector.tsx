"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { on } from "events";

interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    accent: string;
    surface: string;
  };
}

const themes: Theme[] = [
  {
    id: "purple",
    name: "Dark Purple",
    colors: {
      primary: "#0f0f23",
      accent: "#8b5cf6",
      surface: "#1e1e3f",
    },
  },
  {
    id: "blue",
    name: "Ocean Blue",
    colors: {
      primary: "#0c1426",
      accent: "#3b82f6",
      surface: "#1e293b",
    },
  },
  {
    id: "emerald",
    name: "Forest Green",
    colors: {
      primary: "#0c1f17",
      accent: "#10b981",
      surface: "#1a2e23",
    },
  },
  {
    id: "rose",
    name: "Midnight Rose",
    colors: {
      primary: "#1f0c14",
      accent: "#f43f5e",
      surface: "#2e1a23",
    },
  },
  {
    id: "amber",
    name: "Golden Amber",
    colors: {
      primary: "#1f1611",
      accent: "#f59e0b",
      surface: "#2e251a",
    },
  },
];

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export default function ThemeSelector({
  currentTheme,
  onThemeChange,
}: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="neu-button rounded-xl flex items-center justify-center theme-text-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Palette className="mr-2 w-4 h-4 theme-accent"></Palette>
        Themes
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 z-50 w-72"
          >
            <div className="neu-card rounded-2xl p-6">
              <h3 className="text-lg font-bold theme-text-primary mb-4">
                Choose Theme
              </h3>
              <div className="space-y-3">
                {themes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    className={`neu-button mb-2 w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      currentTheme === theme.id
                        ? "neu-selected"
                        : "neu-button hover:neu-pressed"
                    }`}
                    onClick={() => {
                      onThemeChange(theme.id);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex justify-center space-x-1">
                        <div
                          className="rounded-full w-4 h-4 border border-gray-600"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div
                          className="rounded-full w-4 h-4 border border-gray-600"
                          style={{ backgroundColor: theme.colors.accent }}
                        />
                        <div
                          className="rounded-full w-4 h-4 border border-gray-600"
                          style={{ backgroundColor: theme.colors.surface }}
                        />
                      </div>
                      <span className="font-semibold theme-text-primary">
                        {theme.name}
                      </span>
                    </div>
                  </motion.button>
                ))}

                <div className="mt-6 pt-6 border-t border-gray-600">
                  <p className="text-center text-xs theme-text-muted">
                    Change the theme of your MailBox
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

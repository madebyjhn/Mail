"use client";

import { useEffect, useState } from "react";
import { handleSignIn, handleSignOut } from "../lib/auth";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import ProductionPage from "../pages/productionpage";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Mail, Palette } from "lucide-react";
import ThemeSelector from "../pages/ThemeSelector";
import ScalesWave from "../components/ScalesWave";

type Message = {
  id: string;
  subject?: string;
  snippet?: string;
};

type FullMessage = {
  id: string;
  subject?: string;
  snippet?: string;
  body?: string;
};

export default function App() {
  if (process.env.NODE_ENV === "production") {
    return <ProductionPage />;
  }

  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<FullMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [maxResults, setMaxResults] = useState(10);
  const [currentTheme, setCurrentTheme] = useState("purple");

  useEffect(() => {
    if (session) {
      setLoading(true); // Ajouté ici
      fetch(`/api/server?maxResults=${maxResults}`)
        .then((res) => res.json())
        .then((data) => {
          setMessages(data.messages || []);
        })
        .finally(() => setLoading(false)); // Ajouté ici
      document.documentElement.setAttribute("data-theme", currentTheme);
    }
  }, [session, maxResults, currentTheme]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-full">
          <ScalesWave />
        </div>
      ) : session ? (
        <div className="flex h-screen p-4 gap-4">
          {/*SideBar*/}
          <AnimatePresence>
            <motion.div className="w-80 flex-shrink-0">
              <div className="neu-flat rounded-3xl h-full overflow-hidden"></div>
            </motion.div>
          </AnimatePresence>

          {/*Main Content*/}
          <div className="flex-1 flex flex-col gap-4">
            <motion.header className="w-full neu-flat h-18 rounded-2xl px-6 py-4 mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="neu-button rounded-xl lg:hidden theme-text-primary"
                ></Button>
                <div className="flex items-center space-x-3">
                  <div className="neu-button rounded-xl p-2">
                    <Mail className="w-6 h-6 theme-accent" />
                  </div>
                  <h1 className="text-xl font-bold theme-text-primary">
                    MailBox
                  </h1>
                </div>
              </div>
              <div className="space-x-3 flex items-center">
                <Input className="neu-input w-64 rounded-xl"></Input>
                <ThemeSelector
                  currentTheme={currentTheme}
                  onThemeChange={setCurrentTheme}
                />
              </div>
            </motion.header>
          </div>
        </div>
      ) : (
        <div>
          <h2>Sign In using Google</h2>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { handleSignIn, handleSignOut } from "../lib/auth";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import ProductionPage from "../pages/productionpage";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Mail, Search } from "lucide-react";
import ThemeSelector from "../pages/ThemeSelector";
import ScalesWave from "../components/ScalesWave";
import SideBar from "../pages/SideBar";

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
  const [minLoading, setMinLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState("inbox");
  const [isCompose, setIsCompose] = useState(false);

  useEffect(() => {
    if (loading) {
      setMinLoading(true);
      const timer = setTimeout(() => setMinLoading(false), 4000);
      return () => clearTimeout(timer);
    } else {
      setMinLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (session) {
      //setLoading(true);
      fetch(`/api/server?maxResults=${maxResults}`)
        .then((res) => res.json())
        .then((data) => {
          setMessages(data.messages || []);
        })
        .finally(() => setLoading(false));
      document.documentElement.setAttribute("data-theme", currentTheme);
    }
  }, [session, maxResults, currentTheme]);

  const handleCompose = () => {
    setIsCompose(true);
  };

  return (
    <>
      {loading || minLoading ? (
        <div className="flex items-center justify-center h-screen w-full">
          <ScalesWave />
        </div>
      ) : session ? (
        <div className="flex h-screen p-4 gap-4">
          {/*SideBar*/}
          <AnimatePresence>
            <motion.div
              className="w-80 flex-shrink-0"
              initial={{ opacity: 0, x: -320 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.47, ease: "easeInOut" }}
            >
              <div className="neu-flat rounded-3xl h-full overflow-hidden">
                <SideBar
                  selectedFolder={selectedFolder}
                  onSelectFolder={setSelectedFolder}
                  onCompose={handleCompose}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/*Main Content*/}
          <div className="flex-1 flex flex-col gap-4">
            <motion.header className="neu-card rounded-2xl px-6 py-4 flex items-center justify-between">
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
              <div className="space-x-4 flex items-center">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-4 top-1/3 transform -translate-1/3 theme-text-muted" />
                  <Input
                    placeholder="Search emails..."
                    className="neu-input pl-12 w-64 border-0 rounded-xl bg-transparent theme-text-primary placeholder:theme-text-muted focus:neu-selected"
                  ></Input>
                </div>
                <ThemeSelector
                  currentTheme={currentTheme}
                  onThemeChange={setCurrentTheme}
                />
              </div>
            </motion.header>
            <div className="flex-1 flex gap-4 overflow-hidden rounded-2xl">
              <motion.div className="w-96 rounded-2xl overflow-hidden">
                <div className="neu-card h-full rounded-2xl overflow-hidden"></div>
              </motion.div>
              <motion.div className="flex-1 overflow-hidden rounded-2xl">
                <div className="neu-card h-full rounded-2xl overflow-hidden"></div>
              </motion.div>
            </div>
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

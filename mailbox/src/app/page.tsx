"use client";

import { useEffect, useState } from "react";
import { handleSignIn, handleSignOut } from "./lib/auth";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Home() {
  const [showNotify, setShowNotify] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (process.env.NODE_ENV === "production") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(120deg, #6366f1 0%, #a5b4fc 100%)",
        }}
      >
        {/* Animated background blobs */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          style={{ pointerEvents: "none" }}
        >
          <motion.div
            className="absolute rounded-full bg-indigo-300 blur-3xl"
            style={{ width: 400, height: 400, top: -100, left: -100 }}
            animate={{
              x: [0, 100, 0],
              y: [0, 100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute rounded-full bg-purple-300 blur-3xl"
            style={{ width: 300, height: 300, bottom: -80, right: -80 }}
            animate={{
              x: [0, -80, 0],
              y: [0, -80, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Logo or emoji */}
        <motion.div
          className="z-10 mb-6"
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 8 }}
        >
          <motion.span
            style={{
              fontSize: "4rem",
              filter: "drop-shadow(0 4px 16px #818cf8)",
              display: "inline-block",
            }}
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            📬
          </motion.span>
        </motion.div>

        {/* Main title with light effect */}
        <motion.h1
          className="z-10 text-4xl md:text-5xl font-extrabold text-white text-center mb-4 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="relative">
            <span
              className="absolute left-0 top-1/2 w-full h-2 bg-gradient-to-r from-white/60 via-indigo-200/80 to-white/60 blur-lg opacity-60"
              style={{ transform: "translateY(-50%)" }}
            />
            Site en construction
          </span>
        </motion.h1>

        {/* Subtitle with animated gradient text */}
        <motion.p
          className="z-10 text-lg md:text-2xl font-medium text-center mb-8 bg-gradient-to-r from-indigo-200 via-white to-indigo-300 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          On prépare une expérience mail unique.
          <br />
          Revenez bientôt pour la découvrir&nbsp;!
        </motion.p>

        {/* Notification button and form */}
        <motion.div className="z-10 flex flex-col items-center mb-4">
          <motion.button
            className="px-8 py-3 rounded-full bg-white/80 text-indigo-700 font-semibold shadow-lg hover:bg-white transition text-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={() => setShowNotify((v) => !v)}
            disabled={submitted}
          >
            {submitted ? "Merci, à bientôt !" : "Être prévenu à l'ouverture"}
          </motion.button>
          <AnimatePresence>
            {showNotify && !submitted && (
              <motion.form
                key="notify-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center mt-4 w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                  setTimeout(() => {
                    setShowNotify(false);
                  }, 1500);
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="Votre email"
                  className="px-4 py-2 rounded-l-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ minWidth: 220 }}
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-r-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition"
                >
                  Valider
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="z-10 absolute bottom-6 left-0 w-full text-center text-white/70 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          &copy; {new Date().getFullYear()} Mailbox — Tous droits réservés.
        </motion.footer>
      </motion.div>
    );
  }

  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<FullMessage | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      fetch("/api/server")
        .then((res) => res.json())
        .then((data) => {
          setMessages(data.messages || []);
        });
    }
  }, [session]);

  // Fonction pour charger le mail complet
  const handleShowMail = async (id: string) => {
    setLoading(true);
    const res = await fetch(`/api/server?id=${id}`);
    const data = await res.json();
    setSelected(data.message);
    setLoading(false);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {session ? (
          <div>
            <h2>Welcome {session.user?.name}</h2>
            <button onClick={handleSignOut}>Sign Out</button>
            <div className="flex flex-col gap-2 mt-4">
              {messages.map((message) => (
                <button
                  key={message.id}
                  className="border text-black p-4 my-2 rounded hover:bg-indigo-50 transition"
                  onClick={() => handleShowMail(message.id)}
                >
                  <h3 className="font-semibold">{message.subject}</h3>
                  <p className="text-gray-600">{message.snippet}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2>Sign In using Google</h2>
            <button onClick={handleSignIn}>Sign In</button>
          </div>
        )}
      </main>

      {/* Modale pour afficher le mail complet */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full relative"
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-4 text-xl text-gray-400 hover:text-gray-700"
                onClick={() => setSelected(null)}
                aria-label="Fermer"
              >
                ×
              </button>
              <h3 className="text-xl font-bold mb-2">{selected.subject}</h3>
              <p className="mb-4 text-gray-600">{selected.snippet}</p>
              <div
                className="prose max-w-none"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {loading ? (
                  "Chargement..."
                ) : (
                  selected.body || (
                    <span className="italic text-gray-400">Aucun contenu</span>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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

export default function Home() {
  if (process.env.NODE_ENV === "production") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f3f4f6 0%, #e0e7ff 100%)",
        }}
      >
        <motion.h1
          style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#6366f1" }}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          🚧 Site en construction 🚧
        </motion.h1>
        <motion.p
          style={{ fontSize: "1.2rem", color: "#374151" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Revenez bientôt pour découvrir notre service&nbsp;!
        </motion.p>
      </motion.div>
    );
  }

  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      setLoading(true);
      fetch("/api/server")
        .then((res) => res.json())
        .then((data) => {
          setMessages(data.messages || []);
        })
        .finally(() => setLoading(false));
    }
  }, [session]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 flex flex-col items-center justify-center p-4"
    >
      <main className="w-full max-w-xl mx-auto bg-white/80 rounded-xl shadow-lg p-8 mt-8">
        <AnimatePresence>
          {session ? (
            <motion.div
              key="signed-in"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <motion.h2
                  className="text-2xl font-bold text-indigo-700"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Bienvenue, {session.user?.name}
                </motion.h2>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSignOut}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 transition"
                >
                  Se déconnecter
                </motion.button>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-indigo-600">
                  Vos derniers mails :
                </h3>
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-500"
                  >
                    Chargement...
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {messages.length === 0 ? (
                        <motion.div
                          key="no-messages"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-gray-400 italic"
                        >
                          Aucun message trouvé.
                        </motion.div>
                      ) : (
                        messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="border border-indigo-200 bg-white rounded-lg p-4 shadow hover:shadow-md transition"
                          >
                            <h4 className="font-semibold text-indigo-700">
                              {message.subject}
                            </h4>
                            <p className="text-gray-600">{message.snippet}</p>
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="signed-out"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <motion.h2
                className="text-2xl font-bold text-indigo-700 mb-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                Connecte-toi avec Google
              </motion.h2>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignIn}
                className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-600 transition text-lg"
              >
                Se connecter
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <footer className="mt-10 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Mailbox. Tous droits réservés.
      </footer>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

export default function Home() {
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
          On prépare une expérience mail unique.<br />
          Revenez bientôt pour la découvrir&nbsp;!
        </motion.p>

        {/* Disabled button for notification */}
        <motion.button
          className="z-10 px-8 py-3 rounded-full bg-white/80 text-indigo-700 font-semibold shadow-lg hover:bg-white transition text-lg cursor-not-allowed"
          style={{ opacity: 0.7 }}
          disabled
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Être prévenu à l'ouverture (bientôt)
        </motion.button>

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

  // ... Ton code normal pour le développement local ...
  return null;
}

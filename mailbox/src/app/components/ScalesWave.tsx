"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function ScalesWave() {
  // Grille de carrés qui remplit tout l'écran
  const cols = 25;
  const rows = 15;
  const squares = Array.from({ length: rows * cols }, (_, i) => ({
    id: i,
    row: Math.floor(i / cols),
    col: i % cols,
  }));

  // Animation d'écailles diagonales avec style neumorphique
  const squareVariants = {
    initial: {
      opacity: 0.1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
    },
    animate: (custom: { row: number; col: number }) => {
      const diagonalIndex = custom.row + custom.col;
      return {
        opacity: [0.1, 0.6, 0.1],
        scale: [1, 1.05, 1],
        rotateX: [0, -5, 0],
        rotateY: [0, 5, 0],
        transition: {
          duration: 3,
          delay: diagonalIndex * 0.08,
          repeat: Infinity,
          repeatType: "loop" as const,
          ease: "easeInOut",
        },
      };
    },
  };

  const logoVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateY: 0,
    },
    animate: {
      scale: [0, 1.1, 1],
      opacity: [0, 1, 1],
      rotateY: [0, 360],
      transition: {
        duration: 1.2,
        delay: 1,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    initial: {
      y: 30,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 1.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--theme-bg-primary) 0%, var(--theme-bg-secondary) 50%, var(--theme-bg-tertiary) 100%)",
        perspective: "1000px",
      }}
    >
      {/* Grille d'écailles neumorphiques plein écran */}
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          transformStyle: "preserve-3d",
        }}
      >
        {squares.map((square) => (
          <motion.div
            key={square.id}
            custom={square}
            variants={squareVariants}
            initial="initial"
            animate="animate"
            className="w-full h-full"
            style={{
              background: `linear-gradient(145deg, var(--theme-surface), var(--theme-bg-secondary))`,
              borderRight: "0.5px solid var(--theme-border)",
              borderBottom: "0.5px solid var(--theme-border)",
              boxShadow: `
                inset 2px 2px 4px var(--theme-shadow-light),
                inset -2px -2px 4px var(--theme-shadow-dark)
              `,
              transformStyle: "preserve-3d",
              transformOrigin: "center center",
            }}
          />
        ))}
      </div>

      {/* Contenu central avec style neumorphique */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center">
          {/* Logo avec effet neumorphique */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            className="mb-8"
          >
            <div
              className="inline-block p-8 rounded-3xl"
              style={{
                background: `linear-gradient(145deg, var(--theme-surface), var(--theme-bg-secondary))`,
                boxShadow: `
                  20px 20px 40px var(--theme-shadow-dark),
                  -20px -20px 40px var(--theme-shadow-light)
                `,
                border: `1px solid var(--theme-border)`,
              }}
            >
              <Mail
                className="w-16 h-16 mx-auto"
                style={{ color: "var(--theme-accent)" }}
              />
            </div>
          </motion.div>

          {/* Titre et texte */}
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="space-y-4 mb-8"
          >
            <h1
              className="text-5xl font-bold"
              style={{
                color: "var(--theme-text-primary)",
                textShadow: "2px 2px 4px var(--theme-shadow-dark)",
              }}
            >
              MailBox
            </h1>
            <p
              className="text-xl"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              Preparing your modern email experience...
            </p>
          </motion.div>

          {/* Barre de progression neumorphique */}
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="w-96 mx-auto"
          >
            <div
              className="p-2 rounded-full mb-4"
              style={{
                background: `linear-gradient(145deg, var(--theme-bg-secondary), var(--theme-surface))`,
                boxShadow: `
                  inset 6px 6px 12px var(--theme-shadow-dark),
                  inset -6px -6px 12px var(--theme-shadow-light)
                `,
                border: `1px solid var(--theme-border)`,
              }}
            >
              <div className="relative h-3 rounded-full overflow-hidden">
                <div
                  className="absolute inset-0 rounded-full opacity-30"
                  style={{ background: "var(--theme-surface)" }}
                />
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 4,
                    delay: 2,
                    ease: "easeInOut",
                  }}
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, var(--theme-accent) 0%, var(--theme-accent-hover) 100%)`,
                    boxShadow: `0 0 10px var(--theme-accent)`,
                  }}
                />
              </div>
            </div>

            {/* Points de chargement neumorphiques */}
            <div className="flex justify-center space-x-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: `linear-gradient(145deg, var(--theme-accent), var(--theme-accent-hover))`,
                    boxShadow: `
                      2px 2px 4px var(--theme-shadow-dark),
                      -2px -2px 4px var(--theme-shadow-light),
                      0 0 8px var(--theme-accent)
                    `,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Texte de statut */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="mt-8"
          >
            <motion.p
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-sm"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Loading your inbox...
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Effet de lueur ambiante subtile */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          background: `radial-gradient(circle at 50% 50%, var(--theme-accent) 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Mail, Inbox, Send, Star, Archive } from "lucide-react";

export default function ScaleWaves() {
  // Animation des icônes flottantes
  const floatingIcons = [
    { Icon: Mail, delay: 0, x: -100, y: -50 },
    { Icon: Inbox, delay: 0.5, x: 100, y: -80 },
    { Icon: Send, delay: 1, x: -80, y: 60 },
    { Icon: Star, delay: 1.5, x: 120, y: 40 },
    { Icon: Archive, delay: 2, x: -120, y: -20 },
  ];

  // Animation du logo principal
  const logoVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateY: -180,
    },
    animate: {
      scale: [0, 1.2, 1],
      opacity: [0, 1, 1],
      rotateY: [-180, 0],
      transition: {
        duration: 1.5,
        delay: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Animation du texte
  const textVariants = {
    initial: {
      y: 50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 1.2,
        ease: "easeOut",
      },
    },
  };

  // Animation des cartes d'email simulées
  const emailCardVariants = {
    initial: {
      x: -300,
      opacity: 0,
      rotateY: -45,
    },
    animate: (index: number) => ({
      x: 0,
      opacity: [0, 1, 0.8],
      rotateY: 0,
      transition: {
        duration: 1,
        delay: 2 + index * 0.2,
        ease: "easeOut",
      },
    }),
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
      }}
    >
      {/* Icônes flottantes en arrière-plan */}
      <div className="absolute inset-0">
        {floatingIcons.map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              scale: 0,
              x: x,
              y: y,
            }}
            animate={{
              opacity: [0, 0.3, 0.1],
              scale: [0, 1.5, 1],
              x: [x, x + 20, x],
              y: [y, y - 30, y],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              delay: delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <div
              className="p-4 rounded-2xl"
              style={{
                background: `linear-gradient(145deg, var(--theme-surface), var(--theme-bg-secondary))`,
                boxShadow: `
                  10px 10px 20px var(--theme-shadow-dark),
                  -10px -10px 20px var(--theme-shadow-light)
                `,
                border: `1px solid var(--theme-border)`,
              }}
            >
              <Icon
                className="w-8 h-8"
                style={{ color: "var(--theme-accent)" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-8">
          {/* Logo principal avec effet neumorphique */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            className="mb-12"
          >
            <div
              className="inline-block p-12 rounded-3xl relative"
              style={{
                background: `linear-gradient(145deg, var(--theme-surface), var(--theme-bg-secondary))`,
                boxShadow: `
                  25px 25px 50px var(--theme-shadow-dark),
                  -25px -25px 50px var(--theme-shadow-light)
                `,
                border: `1px solid var(--theme-border)`,
              }}
            >
              <Mail
                className="w-20 h-20 mx-auto"
                style={{ color: "var(--theme-accent)" }}
              />

              {/* Effet de pulsation autour du logo */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-3xl"
                style={{
                  border: `2px solid var(--theme-accent)`,
                  opacity: 0.3,
                }}
              />
            </div>
          </motion.div>

          {/* Titre et description */}
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="space-y-6 mb-12"
          >
            <h1
              className="text-6xl font-bold"
              style={{
                color: "var(--theme-text-primary)",
                textShadow: "3px 3px 6px var(--theme-shadow-dark)",
              }}
            >
              MailBox
            </h1>
            <p
              className="text-2xl font-medium"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              Your Modern Email Experience
            </p>
            <p className="text-lg" style={{ color: "var(--theme-text-muted)" }}>
              Crafting the perfect inbox for you...
            </p>
          </motion.div>

          {/* Simulation de cartes d'email qui se chargent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="space-y-4 mb-8"
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                custom={index}
                variants={emailCardVariants}
                initial="initial"
                animate="animate"
                className="max-w-md mx-auto"
              >
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: `linear-gradient(145deg, var(--theme-surface), var(--theme-bg-secondary))`,
                    boxShadow: `
                      8px 8px 16px var(--theme-shadow-dark),
                      -8px -8px 16px var(--theme-shadow-light)
                    `,
                    border: `1px solid var(--theme-border)`,
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-full"
                      style={{
                        background: `linear-gradient(145deg, var(--theme-accent), var(--theme-accent-hover))`,
                        boxShadow: `
                          4px 4px 8px var(--theme-shadow-dark),
                          -4px -4px 8px var(--theme-shadow-light)
                        `,
                      }}
                    />
                    <div className="flex-1">
                      <div
                        className="h-3 rounded mb-2"
                        style={{
                          background: `linear-gradient(145deg, var(--theme-bg-secondary), var(--theme-surface))`,
                          boxShadow: `
                            inset 2px 2px 4px var(--theme-shadow-dark),
                            inset -2px -2px 4px var(--theme-shadow-light)
                          `,
                          width: `${80 - index * 10}%`,
                        }}
                      />
                      <div
                        className="h-2 rounded"
                        style={{
                          background: `linear-gradient(145deg, var(--theme-bg-secondary), var(--theme-surface))`,
                          boxShadow: `
                            inset 2px 2px 4px var(--theme-shadow-dark),
                            inset -2px -2px 4px var(--theme-shadow-light)
                          `,
                          width: `${60 - index * 5}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Barre de progression */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
            className="max-w-md mx-auto"
          >
            <div
              className="p-3 rounded-full"
              style={{
                background: `linear-gradient(145deg, var(--theme-bg-secondary), var(--theme-surface))`,
                boxShadow: `
                  inset 8px 8px 16px var(--theme-shadow-dark),
                  inset -8px -8px 16px var(--theme-shadow-light)
                `,
                border: `1px solid var(--theme-border)`,
              }}
            >
              <div className="relative h-4 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 3,
                    delay: 3.5,
                    ease: "easeInOut",
                  }}
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, var(--theme-accent) 0%, var(--theme-accent-hover) 100%)`,
                    boxShadow: `
                      0 0 15px var(--theme-accent),
                      inset 2px 2px 4px rgba(255,255,255,0.1)
                    `,
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Points de chargement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
            className="flex justify-center space-x-4 mt-8"
          >
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-4 h-4 rounded-full"
                style={{
                  background: `linear-gradient(145deg, var(--theme-accent), var(--theme-accent-hover))`,
                  boxShadow: `
                    3px 3px 6px var(--theme-shadow-dark),
                    -3px -3px 6px var(--theme-shadow-light),
                    0 0 12px var(--theme-accent)
                  `,
                }}
              />
            ))}
          </motion.div>

          {/* Message de statut */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5 }}
            className="mt-8"
          >
            <motion.p
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-base font-medium"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Synchronizing your messages...
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Effet de lueur ambiante */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: `radial-gradient(ellipse at center, var(--theme-accent) 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  );
}

import { motion, Variants, easeInOut } from "framer-motion";

// ...existing code...

const variants: Variants = {
  initial: { y: 0, opacity: 0 },
  animate: {
    y: 20,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: easeInOut, // Use the imported easing function
    },
  },
};

// ...existing code...
"use client";

import { useEffect, useState } from "react";
import { handleSignIn, handleSignOut } from "./lib/auth";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import ProductionPage from "./pages/productionpage";
import Float from "./components/float";

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
  if (process.env.NODE_ENV === "production") {
    return <ProductionPage />;
  }

  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<FullMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [maxResults, setMaxResults] = useState(10);

  useEffect(() => {
    if (session) {
      fetch(`/api/server?maxResults=${maxResults}`)
        .then((res) => res.json())
        .then((data) => {
          setMessages(data.messages || []);
        });
    }
  }, [session, maxResults]);

  return (
    <>
      {session ? (
        <div className="flex h-screen p-4 gap-4"></div>
      ) : (
        <div>
          <h2>Sign In using Google</h2>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      )}
    </>
  );
}

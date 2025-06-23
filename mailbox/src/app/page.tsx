"use client";

import { useEffect, useState } from "react";
import { handleSignIn, handleSignOut } from "./lib/auth";
import { useSession } from "next-auth/react";

type Message = {
  id: string;
  subject?: string;
  snippet?: string;
};

export default function Home() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (session) {
      fetch("/api/server")
        .then((res) => res.json())
        .then((data) => {
          setMessages(data.messages || []);
          console.log("Gmail messages:", data);
        });
    }
  }, [session]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {session ? (
          <div>
            <h2>Welcome {session.user?.name}</h2>
            <button onClick={handleSignOut}>Sign Out</button>
            {messages.map((message) => (
              <div key={message.id} className="border text-black p-4 my-2">
                <h3>{message.subject}</h3>
                <p>{message.snippet}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h2>Sign In using Google</h2>
            <button onClick={handleSignIn}>Sign In</button>
          </div>
        )}
      </main>
    </div>
  );
}

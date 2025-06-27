"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function DebugPage() {
  const { data: session, status } = useSession();
  const [emails, setEmails] = useState<any[] | null>(null);

  useEffect(() => {
    if (session?.accessToken) {
      fetch("/api/server/emails", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.emails) {
            setEmails(data.emails);
          } else {
            console.log("Aucun email :", data);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [session]);

  if (status === "loading") return <p>Chargement…</p>;

  if (!session)
    return (
      <div>
        <p>Tu n’es pas connecté.</p>
        <button onClick={() => signIn()}>Se connecter</button>
      </div>
    );

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Debug Session</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <h2>Emails Récents</h2>
      {emails ? (
        <pre>{JSON.stringify(emails, null, 2)}</pre>
      ) : (
        <p>Chargement des emails…</p>
      )}

      <button onClick={() => signOut()}>Se déconnecter</button>
    </div>
  );
}

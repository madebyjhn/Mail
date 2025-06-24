import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";
import { log } from "console";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const accessToken = (session as { accessToken?: string } | null)?.accessToken;

  if (!accessToken) {
    return NextResponse.json({ error: "No access token" }, { status: 401 });
  }

  console.log(accessToken);

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    // Récupère le mail complet
    const res = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=full`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const data = await res.json();
    const subjectHeader = data.payload?.headers?.find(
      (h: { name: string }) => h.name === "Subject"
    );
    // Décodage du body (base64)
    let body = "";
    if (data.payload?.parts?.[0]?.body?.data) {
      body = Buffer.from(data.payload.parts[0].body.data, "base64").toString(
        "utf-8"
      );
    } else if (data.payload?.body?.data) {
      body = Buffer.from(data.payload.body.data, "base64").toString("utf-8");
    }
    return NextResponse.json({
      message: {
        id,
        subject: subjectHeader?.value || "(Pas de sujet)",
        snippet: data.snippet,
        body,
      },
    });
  }

  const maxResults = searchParams.get("maxResults") || "10";

  // 1. Récupère la liste des messages (IDs)
  const listRes = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const listData = await listRes.json();

  if (!listData.messages) {
    return NextResponse.json({ messages: [] });
  }

  // 2. Pour chaque ID, récupère le contenu du message
  const messages = await Promise.all(
    listData.messages.map(async (msg: { id: string }) => {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const msgData = await msgRes.json();
      // Récupère le sujet
      const subjectHeader = msgData.payload?.headers?.find(
        (h: any) => h.name === "Subject"
      );
      return {
        id: msg.id,
        subject: subjectHeader?.value || "(Pas de sujet)",
        snippet: msgData.snippet,
      };
    })
  );

  return NextResponse.json({ messages });
}

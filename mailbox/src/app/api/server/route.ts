import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const accessToken = (session as any)?.accessToken;

  if (!accessToken) {
    return NextResponse.json({ error: "No access token" }, { status: 401 });
  }

  // 1. Récupère la liste des messages (IDs)
  const listRes = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10",
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

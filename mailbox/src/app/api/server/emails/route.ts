export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json(
      { error: "Missing or invalid Authorization header" },
      { status: 400 }
    );
  }

  const accessToken = authHeader.split(" ")[1];

  try {
    const gmailRes = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const list = await gmailRes.json();

    if (!list.messages) {
      return Response.json({ emails: [] });
    }

    const emails = await Promise.all(
      list.messages.map(async (msg: { id: any }) => {
        const r = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const fullEmail = await r.json();

        const headers = fullEmail.payload.headers;
        // Récupère tous les headers utiles
        const subject = headers.find(
          (h: { name: string }) => h.name === "Subject"
        )?.value;
        const from = headers.find(
          (h: { name: string }) => h.name === "From"
        )?.value;
        const to = headers.find((h: { name: string }) => h.name === "To")?.value;
        const cc = headers.find((h: { name: string }) => h.name === "Cc")?.value;
        const bcc = headers.find((h: { name: string }) => h.name === "Bcc")?.value;
        const date = headers.find(
          (h: { name: string }) => h.name === "Date"
        )?.value;
        const replyTo = headers.find(
          (h: { name: string }) => h.name === "Reply-To"
        )?.value;
        const messageId = headers.find(
          (h: { name: string }) => h.name === "Message-ID"
        )?.value;

        // Labels et snippet
        const labels = fullEmail.labelIds || [];
        const snippet = fullEmail.snippet;

        // Corps du message (texte brut ou HTML)
        let body = "";
        const parts = fullEmail.payload.parts || [];
        for (const part of parts) {
          if (part.mimeType === "text/plain" && part.body?.data) {
            body = Buffer.from(part.body.data, "base64").toString("utf-8");
            break;
          }
        }

        return {
          id: msg.id,
          subject,
          from,
          to,
          cc,
          bcc,
          date,
          replyTo,
          messageId,
          labels,
          snippet,
          body,
          rawHeaders: headers, // pour debug, tu peux retirer si tu veux
        };
      })
    );

    return Response.json({ emails });
  } catch (e) {
    return Response.json(
      { error: "Erreur interne", details: `${e}` },
      { status: 500 }
    );
  }
}

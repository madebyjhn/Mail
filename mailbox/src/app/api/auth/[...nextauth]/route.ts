import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/gmail.readonly",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Ajoute la photo à la session
      if (session.user) {
        session.user.image = token.picture as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }

      session.accessToken = token.accessToken as string;

      return session;
    },
    async jwt({ token, account, profile }) {
      // Ajoute la photo au token
      if (account && profile) {
        token.picture = (profile as { picture?: string }).picture || "";
        token.name = (profile as { name: string }).name || "";
        token.email = (profile as { email: string }).email || "";
      }

      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
  },
});

export { handler as GET, handler as POST };

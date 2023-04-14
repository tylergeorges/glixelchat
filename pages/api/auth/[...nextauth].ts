import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, credentials, email, profile }) {
      if (user.name) {
        const post_body = { username: user.name };
        const new_user = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          body: JSON.stringify(post_body),
        });

        console.log("new user created in next auth: ", new_user);
      }

      return true;
    },
    async jwt({ account, token, user, profile, session, trigger }) {
      return token;
    },
    async session({ session, token, user }) {
      return session;
    },
  },
} as NextAuthOptions;

export default NextAuth(authOptions);

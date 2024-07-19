import { authService } from "@/services";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_COOKIE } from "@/utils";
import {cookies} from 'next/headers'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials: Record<never, string> | undefined, req) {
        const { email, password } = credentials as any;

        const loginInAuth = await authService.signIn({
          email: email,
          password: password,
        });
        const userData = loginInAuth.data;

        if (userData) {
          cookies().set(ACCESS_TOKEN_COOKIE, userData.access_token);
          return userData;
        } else {
          toast.error("Invalid Email and Password");
          throw new Error("Invalid Email and Password");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };

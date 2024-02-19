import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDb from "./dbConnection";
import User from "../../models/userModel";
import bcrypt from "bcrypt";
import { Document } from "mongoose";

interface user extends Document {
  name: string;
  email: string;
  password: string;
}

async function login(credentials: Credentials): Promise<any> {
  try {
    await connectMongoDb();
    const user = await User.findOne({ email: credentials?.email });
    if (!user) throw new Error("Invalid User Credentials");
    const isCorrect = await bcrypt.compare(
      credentials?.password,
      user?.password
    );
    if (!isCorrect) throw new Error("Invalid User Credentials");
    return user;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
}

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error("An unknown error occurred.");
          }
        }
      },
    }),
  ],
  callbacks: {
    // async jwt({ token, user }:{token: Partial<Token>, user:Partial<UserData>}) {
    //   if (user) {
    //     token.name = user.name;
    //     token.email = user.email;
    //     token.id = user._id;
    //   }
    //   return token;
    // },
    // async session({ session, token }: {session:CallbacksSession, token:Partial<Token>}) {
    //   console.log({session}, {token})
    //   if (token) {
    //     session.user.name = token.name;
    //     session.user.email = token.email;
    //     session.id = token._id;
    //   }
    //   return session;
    // },
  },
};
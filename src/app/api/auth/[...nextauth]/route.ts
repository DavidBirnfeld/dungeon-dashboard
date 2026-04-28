import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../../lib/mongodb";

const handler = NextAuth({
  // 1. The Database Adapter
  adapter: MongoDBAdapter(clientPromise),
  
  // 2. The Authentication Providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
});

// 3. The App Router Exports
export { handler as GET, handler as POST };
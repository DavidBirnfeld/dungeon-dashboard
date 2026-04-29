import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";


// 2. We pass the variable into the handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
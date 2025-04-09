import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { object, string, ZodError } from "zod";
import { compare } from "bcrypt";

interface CustomUser {
    id: string;
    email: string;
    name?: string;
    role?: string; // If you plan to add roles
}

const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalud email"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
})

export const { auth, signOut, handlers } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/sign-in"
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
            try {
                const { email, password } = await signInSchema.parseAsync(credentials) 
                
                const existingUser = await prisma.user.findUnique({
                    where: { email }
                })

                if(!existingUser) {
                    return null;
                }

                const passwordMatch = await compare(password, existingUser.password);

                if(!passwordMatch) {
                    return null;
                }

                return {
                    id: `${existingUser.id}`,
                    email: existingUser.email,
                    name: existingUser.fullName,
                    role: existingUser.role
                }
            } catch (error) {
                if(error instanceof ZodError) {
                    return null;
                }
            }
            return null;
        }
    })],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.name = user.name;
                token.id = user.id as string;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
          if (session.user && token.name) {
            session.user.name = token.name;
            session.user.id = token.id as string;
            session.user.role = token.role as string;
          }
          return session;
        },
      }
})
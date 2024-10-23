import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./db";
import { signInSchema } from "./z";
import bcryptjs from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      fullName?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        let user: { email: string; password?: string | null } | null = null;

        //Validate credentials using zod (email, password)
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.log("Invalid Credentials", parsedCredentials.error.errors);
          return null;
        }

        //Get User From Database
        user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) {
          console.log("Invalid credentials");
          return null;
        }

        if (!user.password) {
          console.log(
            "User has no password. They probably signed up with an oauth provider."
          );
          return null;
        }

        const isPasswordValid = await bcryptjs.compare(
          credentials?.password as string,
          user.password
        );

        if (!isPasswordValid) {
          // TODO ADD THIS TO FRONTEND
          console.log("Invalid Password");
          return null;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;
        console.log(user);

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ profile, credentials }) {
      if (!profile && !credentials) throw new Error("No Profile");

      // Database Check Using Try Catch
      try {
        //Check if user already exist in database
        const userExist = await prisma.user.findUnique({
          where: {
            email: (profile?.email as string) || (credentials?.email as string),
          },
        });
        //console.log(userExist);
        if (userExist) return true;

        //if doesn't exist then add to database
        await prisma.user.create({
          data: {
            email:
              (profile?.email as string) ||
              (credentials?.email as string) ||
              "",
            username: (profile?.name ?? "defaultUsername")
              .replace(" ", "")
              .toLowerCase(),
            password: "",
            image: profile?.image ?? "",
          },
        });

        return true;
      } catch (error) {
        console.log("Error Checking User Exist: ", error);
        return false;
      }
    },
    async session({ session }) {
      try {
        const result = await prisma.user.findUnique({
          where: {
            email: session.user?.email || "",
          },
        });
        if (result) {
          session.user!.id = result.id;
          session.user!.fullName = result.fullName;
        }
      } catch (error) {
        console.log("There is error when fetching email to database: ", error);
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      // Contoh redirect ke halaman lain setelah login
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`; // Arahkan ke halaman dalam situs
      } else if (url.startsWith("https://")) {
        return url; // Arahkan ke URL eksternal
      }
      return baseUrl; // Arahkan ke halaman default (baseUrl)
    },
    // TODO ADD CALLBACK FOR JWT AND ALSO ROLE AUTHORIZATION
    // JWT USED IN AUTHORIZATION EXAMPLE IN ROLE BASED APP
    // jwt({ token, user, trigger, session }) {
    //     if (user) {
    //         token.id = user.id as string;
    //         token.role = user.role as string;
    //     }
    //     if (trigger === "update" && session) {
    //         token = { ...token, ...session };
    //     }
    //     return token;
    // },
    // session({ session, token }) {
    //     session.user.id = token.id;
    //     session.user.role = token.role;
    //     return session;
    // }
  },
};

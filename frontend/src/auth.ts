import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // For demonstration, allow any user to sign in!
                if (credentials.email && credentials.password) {
                    return { id: "1", name: credentials.email.toString().split('@')[0], email: credentials.email.toString() }
                }

                throw new Error("Invalid credentials")
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
})

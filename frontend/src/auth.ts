import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
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
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Allow relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allow callback URLs on the same origin
            if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
    },
})

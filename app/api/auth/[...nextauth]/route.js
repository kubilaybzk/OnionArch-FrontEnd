import { Backend_URL } from "@/libs/Constants";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/dist/server/api-utils";

async function refreshToken(token) {
  const res = await fetch(Backend_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });
  console.log("refreshed");

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userNameOrEmail: {
          label: "userNameOrEmail",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.userNameOrEmail || !credentials?.password)
          return null;
        const res = await fetch(Backend_URL + "Users/Login", {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userNameOrEmail: credentials.userNameOrEmail,
            password: credentials.password,
          }),
        });
        console.log(res);
        const user = await res.json();
        console.log(user);

        // Check if the response contains a message property
        if (user.message) {
          // Handle the error message here
          console.log(user.message);
          return null;
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user?.token?.accessToken;
        token.expiration = user?.token?.expiration;
      }

      return { ...token, ...user };
    },

    async session({ token, session }) {
      session.user.name = token.userInfo.nameSurname;
      session.user.email = token.userInfo.email;
      session.user.userName = token.userInfo.userName;
      session.accessToken = token.token.accessToken;
      session.expiration = token.token.expiration;

      const currentDate = new Date();
      const expirationDate = new Date(token.expiration);

      if (currentDate < expirationDate) {
        // Token hala geçerli ise oturumu güncelle
        console.log("SÜRE DOLMADI ");
      } else {
        // Token süresi dolmuşsa kullanıcıyı uygulamadan çıkış yapmasını sağla
        console.log("SÜRE DOLDU ");
        redirect("307", "/api/auth/signin");
      }

      return session;
    },
  },
  pages: {
    signIn: "/Login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import jwt from "jsonwebtoken";

const options = {
  site: process.env.NEXT_PUBLIC_SITE || "http://localhost:3000",
  session: { jwt: true },
  jwt: { signingKey: process.env.JWT_SIGNING_PRIVATE_KEY },
  callbacks: {
    async jwt(token, user, account) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, token) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
        const decoded = jwt.decode(session.accessToken);
        if (decoded["cognito:groups"] && decoded["cognito:groups"].includes("VenditoreAdmin")) {
          session.isAdmin = true;
        } else {
          session.isAdmin = false;
        }
      }
      return session;
    },
  },
  providers: [
    Providers.Cognito({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      domain: process.env.COGNITO_DOMAIN,
    }),
  ],
};

export default (req, res) => NextAuth(req, res, options);

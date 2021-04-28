import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import jwt from "jsonwebtoken";

async function refreshAccessToken(token) {
  try {
    const url = `https://${process.env.COGNITO_DOMAIN}/oauth2/token?${new URLSearchParams({
      client_id: process.env.COGNITO_CLIENT_ID,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    })}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });
    const refreshedTokens = await response.json();
    if (!response.ok) {
      throw refreshedTokens;
    }
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      e: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const options = {
  site: process.env.NEXT_PUBLIC_SITE || "http://localhost:3000",
  session: { jwt: true },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    verificationOptions: {
      algorithms: ["HS256"],
    },
  },
  callbacks: {
    async jwt(token, user, account) {
      if (account?.accessToken && user) {
        return {
          accessToken: account.accessToken,
          e: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
        };
      }
      if (Date.now() < token.e) {
        return token;
      }
      return refreshAccessToken(token);
    },
    async session(session, token) {
      if (token?.accessToken) {
        const decoded = jwt.decode(token.accessToken);
        return {
          accessToken: token.accessToken,
          e: token.e,
          adm: decoded["cognito:groups"]?.includes("VenditoreAdmin") ? true : undefined,
          expires: session.expires,
        };
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

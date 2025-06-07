import { Google, generateCodeVerifier, generateState, decodeIdToken } from "arctic";
import { PrismaClient } from "@prisma/client";
import { saveAuthState, getSession, createUserSession, commitSession } from "./session";

const prisma = new PrismaClient();

export const google = new Google(
  import.meta.env.VITE_GOOGLE_CLIENT_ID,
  import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
  import.meta.env.VITE_GOOGLE_REDIRECT_URI
);

export async function getLoginUrl(request: Request) {
  'use server'
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const scopes = ["openid", "profile", "email"];
  const url = google.createAuthorizationURL(state, codeVerifier, scopes);
  url.searchParams.set("access_type", "offline");
  const headers = await saveAuthState(request, state, codeVerifier);
  return { url: url.toString(), headers };
}

export async function handleOAuthCallback(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    return new Response("Missing code or state", { status: 400 });
  }

  const session = await getSession(request);
  const storedState = session.get("state");
  const codeVerifier = session.get("codeVerifier");

  if (!storedState || !codeVerifier || state !== storedState) {
    return new Response("Invalid state", { status: 400 });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const accessToken = tokens.accessToken();
    const accessTokenExpiresAt = tokens.accessTokenExpiresAt();
    const refreshToken = tokens.hasRefreshToken() ? tokens.refreshToken() : null;
    const refreshTokenExpiresIn = tokens.data.refresh_token_expires_in;

    const idToken = tokens.idToken();
    const claims = decodeIdToken(idToken);

    if (!claims.email) {
      return new Response("Email not provided", { status: 400 });
    }

    // Find or create user
    const user = await prisma.user.upsert({
      where: { email: claims.email },
      update: {},
      create: {
        email: claims.email,
        name: claims.name || `${claims.given_name} ${claims.family_name}`,
        password: "", // Empty for OAuth users
      },
    });

    // Génère le slug comme pour login/register
    const [firstName, ...rest] = user.name.split(" ");
    const lastName = rest.join(" ");
    const slug = `${firstName.trim().replace(/\s+/g, '-')}-${lastName.trim().replace(/\s+/g, '-')}`.toLowerCase();

    // Stocke les jetons dans la session
    session.set("access_token", accessToken);
    session.set("access_token_expires_at", accessTokenExpiresAt);
    if (refreshToken) {
      session.set("refresh_token", refreshToken);
      session.set("refresh_token_expires_in", refreshTokenExpiresIn);
    }

    // Crée la session et redirige vers le feed personnalisé
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/pages/${slug}/feed`,
        "Set-Cookie": await storage.commitSession(session),
      },
    });
  } catch (error) {
    console.error("OAuth error:", error);
    return new Response("Authentication failed", { status: 500 });
  }
}

export async function refreshAccessTokenIfNeeded(session) {
  const accessTokenExpiresAt = session.get("access_token_expires_at");
  const refreshToken = session.get("refresh_token");
  if (!refreshToken) return;

  // Si le jeton d'accès est expiré ou va expirer dans moins de 1 minute
  if (Date.now() > accessTokenExpiresAt - 60 * 1000) {
    try {
      const tokens = await google.refreshAccessToken(refreshToken);
      session.set("access_token", tokens.accessToken());
      session.set("access_token_expires_at", tokens.accessTokenExpiresAt());
      // Google ne renvoie pas de nouveau refresh_token ici
    } catch (e) {
      console.error("Erreur lors du refresh du token Google", e);
    }
  }
}
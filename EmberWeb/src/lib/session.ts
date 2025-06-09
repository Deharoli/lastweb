import { createCookieSessionStorage } from "@remix-run/node";

const SESSION_COOKIE_NAME = "ember_session";
const sessionSecret = import.meta.env.VITE_SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("VITE_SESSION_SECRET must be set in your .env file");
}

export const storage = createCookieSessionStorage({
  cookie: {
    name: SESSION_COOKIE_NAME,
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

// Fonction pour récupérer l'email de la session
export async function getSession(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const session = await storage.getSession(cookieHeader);
  return session.get("email") || null; // Retourne directement l'email
}

// Fonction pour créer une session avec email
export async function createSession(email: string, event: any, redirectPath = "/") {
  const session = await storage.getSession();
  session.set("email", email); // Stocke l'email
  const cookie = await storage.commitSession(session);

  return new Response(null, {
    status: 302,
    headers: {
      "Location": redirectPath,
      "Set-Cookie": cookie,
    },
  });
}

// Fonction pour créer une session utilisateur (alias pour createSession)
export async function createUserSession(email: string, event: any, redirectPath = "/") {
  return createSession(email, event, redirectPath);
}

// ✅ FONCTION CORRIGÉE : destroySession
export async function destroySession(request: Request) {
  const session = await storage.getSession(request.headers.get("cookie"));
  const cookie = await storage.destroySession(session);

  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/pages/auth",
      "Set-Cookie": cookie,
    },
  });
}

// ✅ FONCTIONS OAUTH ✅

// Fonction pour sauvegarder l'état OAuth (state et codeVerifier)
export async function saveAuthState(request: Request, state: string, codeVerifier: string) {
  const session = await storage.getSession(request.headers.get("cookie"));
  session.set("state", state);
  session.set("codeVerifier", codeVerifier);
  
  const cookie = await storage.commitSession(session);
  return {
    "Set-Cookie": cookie,
  };
}

// Fonction pour récupérer une session complète (pour OAuth)
export async function getSessionData(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  return await storage.getSession(cookieHeader);
}

// Fonction pour commiter une session
export async function commitSession(session: any) {
  return await storage.commitSession(session);
}

import { createCookieSessionStorage } from "@remix-run/node";
import { type RequestEvent } from "solid-start";

const SESSION_COOKIE_NAME = "ember_session";
const sessionSecret = import.meta.env.VITE_SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("VITE_SESSION_SECRET must be set in your .env file");
}

const storage = createCookieSessionStorage<{ slug: string }>({
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

export async function getSession(event: RequestEvent) {
  const cookieHeader = event.request.headers.get("cookie");
  const session = await storage.getSession(cookieHeader);
  return session.get("slug") || null;
}

export async function createSession(slug: string, event: RequestEvent, redirectPath = "/") {
  const session = await storage.getSession();
  session.set("slug", slug);
  const cookie = await storage.commitSession(session);

  return new Response(null, {
    status: 302,
    headers: {
      "Location": redirectPath,
      "Set-Cookie": cookie,
    },
  });
}

export async function destroySession(event: RequestEvent) {
  const session = await storage.getSession(event.request.headers.get("cookie"));
  const cookie = await storage.destroySession(session);

  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/",
      "Set-Cookie": cookie,
    },
  });
}

export async function saveAuthState(request: Request, state: string, codeVerifier: string) {
  const session = await storage.getSession(request.headers.get("cookie"));
  session.set("state", state);
  session.set("codeVerifier", codeVerifier);
  const cookie = await storage.commitSession(session);
  return { "Set-Cookie": cookie };
}

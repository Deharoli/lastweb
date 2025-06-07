import { MicrosoftEntraId, generateCodeVerifier, generateState } from "arctic";
import { PrismaClient } from "@prisma/client";
import { saveAuthState, getSession } from "./session";

const prisma = new PrismaClient();

export const entra = new MicrosoftEntraId(
  import.meta.env.VITE_AZURE_TENANT_ID,
  import.meta.env.VITE_AZURE_CLIENT_ID,
  null, // Client secret (null for PKCE)
  import.meta.env.VITE_AZURE_REDIRECT_URI,
);

export async function getLoginUrl(request: Request) {
    'use server'
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  
  const url = entra.createAuthorizationURL(
    state, 
    codeVerifier, 
    ["openid", "profile", "email"]
  );
  
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
    const tokens = await entra.validateAuthorizationCode(code, codeVerifier);
    const userInfo = tokens.claims();
    
    if (!userInfo.email) {
      return new Response("Email not provided", { status: 400 });
    }
    
    // Find or create user
    const user = await prisma.user.upsert({
      where: { email: userInfo.email },
      update: {},
      create: {
        email: userInfo.email,
        name: userInfo.name || `${userInfo.given_name} ${userInfo.family_name}`,
        password: "", // Empty for OAuth users
      },
    });
    
    // Create session and redirect
    return createUserSession(user.email, "/");
  } catch (error) {
    console.error("OAuth error:", error);
    return new Response("Authentication failed", { status: 500 });
  }
}
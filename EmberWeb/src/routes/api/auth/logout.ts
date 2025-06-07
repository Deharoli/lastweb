import { APIEvent } from "@solidjs/start/server";
import { destroySession, getSession } from "../../../lib/session";
import { google } from "../../../lib/oauth";

export const POST = async (event: APIEvent) => {
  'use server';
  const session = await getSession(event.request);
  const accessToken = session.get("access_token");
  const refreshToken = session.get("refresh_token");

  // Révoque les jetons Google si présents
  try {
    if (accessToken) await google.revokeToken(accessToken);
    if (refreshToken) await google.revokeToken(refreshToken);
  } catch (e) {
    console.error("Erreur lors de la révocation des jetons Google", e);
  }

  return await destroySession(event);
};
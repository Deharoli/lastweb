import { APIEvent } from "@solidjs/start/server";
import { destroySession, getSessionData } from "../../../lib/session";

export const POST = async (event: APIEvent) => {
  'use server';
  
  try {
    // Récupère la session complète pour accéder aux jetons OAuth
    const session = await getSessionData(event.request);
    const accessToken = session.get("access_token");
    const refreshToken = session.get("refresh_token");

    // Révoque les jetons Google si présents
    if (accessToken || refreshToken) {
      try {
        const { google } = await import("../../../lib/oauth");
        if (accessToken) await google.revokeToken(accessToken);
        if (refreshToken) await google.revokeToken(refreshToken);
      } catch (e) {
        console.error("Erreur lors de la révocation des jetons Google:", e);
        // Continue même si la révocation échoue
      }
    }

    // Détruit la session et redirige
    return await destroySession(event.request);
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    
    // En cas d'erreur, force quand même la suppression du cookie
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/pages/auth",
        "Set-Cookie": "ember_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly",
      },
    });
  }
};
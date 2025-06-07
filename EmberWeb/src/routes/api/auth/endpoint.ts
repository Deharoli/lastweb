import { APIEvent } from "@solidjs/start/server";
import { getSession } from "../../../lib/session";

export async function GET(event: APIEvent) {
  const session = await getSession(event.request);
  const email = session.get("email");
  
  return new Response(
    JSON.stringify({ 
      email: email || null,
      // Vous pouvez ajouter d'autres informations de session si nécessaire
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
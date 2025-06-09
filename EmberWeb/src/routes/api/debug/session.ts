import { APIEvent } from "@solidjs/start/server";
import { getSession } from "../../../lib/session";
import prisma from "../../../lib/prisma";

export const GET = async (event: APIEvent) => {
  'use server';
  
  const email = await getSession(event.request);
  
  if (!email) {
    return new Response(JSON.stringify({ error: "Pas de session" }), { 
      headers: { "Content-Type": "application/json" } 
    });
  }
  
  const user = await prisma.user.findUnique({ where: { email } });
  
  return new Response(JSON.stringify({ 
    email, 
    user: user ? { id: user.id, name: user.name, email: user.email } : null 
  }), { 
    headers: { "Content-Type": "application/json" } 
  });
};
import { APIEvent } from "@solidjs/start/server";
import prisma from "../../../lib/prisma";
import { getSession } from "../../../lib/session";

export const GET = async (event: APIEvent) => {
  'use server';
  
  const email = await getSession(event.request);
  if (!email) return new Response("Non authentifié", { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      officialID: true,
    },
  });

  if (!user) return new Response("Utilisateur introuvable", { status: 404 });

  return new Response(JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });
};
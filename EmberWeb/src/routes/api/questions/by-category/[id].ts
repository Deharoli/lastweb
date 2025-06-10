import { APIEvent } from "@solidjs/start/server";
import prisma from "../../../../lib/prisma";
import { getSession } from "../../../../lib/session";

export const GET = async (event: APIEvent) => {
  'use server';
  
  const email = await getSession(event.request);
  if (!email) return new Response("Non authentifié", { status: 401 });

  const categoryId = parseInt(event.params.id);
  if (!categoryId) return new Response("ID de catégorie invalide", { status: 400 });

  try {
    const questions = await prisma.question.findMany({
      where: { 
        categoryId: categoryId,
        isActive: true 
      },
      include: {
        category: true
      },
      orderBy: { createdAt: "desc" }
    });

    return new Response(JSON.stringify(questions), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Erreur récupération questions:", error);
    return new Response("Erreur serveur", { status: 500 });
  }
};
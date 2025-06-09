import { APIEvent } from "@solidjs/start/server";
import prisma from "../../../../lib/prisma";
import { getSession } from "../../../../lib/session";

export const GET = async (event: APIEvent) => {
  'use server';
  
  const postId = parseInt(event.params.id);
  if (!postId) return new Response("ID de post invalide", { status: 400 });

  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: { id: true, name: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return new Response(JSON.stringify(comments), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error);
    return new Response("Erreur serveur", { status: 500 });
  }
};

export const POST = async (event: APIEvent) => {
  'use server';
  
  const email = await getSession(event.request);
  if (!email) return new Response("Non authentifié", { status: 401 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return new Response("Utilisateur introuvable", { status: 404 });

  const postId = parseInt(event.params.id);
  if (!postId) return new Response("ID de post invalide", { status: 400 });

  const formData = await event.request.formData();
  const content = formData.get("content") as string;

  if (!content?.trim()) {
    return new Response("Contenu du commentaire manquant", { status: 400 });
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        userId: user.id,
        postId: postId
      },
      include: {
        user: {
          select: { id: true, name: true }
        }
      }
    });

    return new Response(JSON.stringify(comment), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Erreur lors de la création du commentaire:", error);
    return new Response("Erreur serveur", { status: 500 });
  }
};
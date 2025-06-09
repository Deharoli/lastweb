import { APIEvent } from "@solidjs/start/server";
import prisma from "../../../../lib/prisma";
import { getSession } from "../../../../lib/session";

export const POST = async (event: APIEvent) => {
  'use server';
  
  const email = await getSession(event.request);
  if (!email) return new Response("Non authentifié", { status: 401 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return new Response("Utilisateur introuvable", { status: 404 });

  const postId = parseInt(event.params.id);
  if (!postId) return new Response("ID de post invalide", { status: 400 });

  try {
    // Vérifie si l'utilisateur a déjà liké
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: postId
        }
      }
    });

    if (existingLike) {
      // Supprime le like (unlike)
      await prisma.like.delete({
        where: { id: existingLike.id }
      });
      return new Response(JSON.stringify({ liked: false }), { 
        headers: { "Content-Type": "application/json" } 
      });
    } else {
      // Ajoute le like
      await prisma.like.create({
        data: {
          userId: user.id,
          postId: postId
        }
      });
      return new Response(JSON.stringify({ liked: true }), { 
        headers: { "Content-Type": "application/json" } 
      });
    }
  } catch (error) {
    console.error("Erreur lors du like:", error);
    return new Response("Erreur serveur", { status: 500 });
  }
};
import { APIEvent } from "@solidjs/start/server";
import prisma from "../../../../lib/prisma";
import { getSession } from "../../../../lib/session";

export const PUT = async (event: APIEvent) => {
  'use server';
  
  const email = await getSession(event.request);
  if (!email) return new Response("Non authentifié", { status: 401 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return new Response("Utilisateur introuvable", { status: 404 });

  const postId = parseInt(event.params.id);
  if (!postId) return new Response("ID de post invalide", { status: 400 });

  try {
    // Vérifier que l'utilisateur est bien le propriétaire du post
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true }
    });

    if (!existingPost) {
      return new Response("Post introuvable", { status: 404 });
    }

    if (existingPost.authorId !== user.id) {
      return new Response("Vous ne pouvez modifier que vos propres posts", { status: 403 });
    }

    const formData = await event.request.formData();
    const title = formData.get("title") as string | null;
    const content = formData.get("content") as string | null;

    if (!title?.trim()) {
      return new Response("Titre manquant", { status: 400 });
    }

    // Mettre à jour le post
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title: title.trim(),
        content: content?.trim() || "",
      },
      include: {
        author: {
          select: { id: true, name: true }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      }
    });

    console.log(`✅ Post ${postId} modifié par l'utilisateur ${user.id}`);
    
    return new Response(JSON.stringify(updatedPost), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Erreur lors de la modification du post:", error);
    return new Response("Erreur serveur", { status: 500 });
  }
};
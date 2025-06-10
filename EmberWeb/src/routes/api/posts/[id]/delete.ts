import { APIEvent } from "@solidjs/start/server";
import prisma from "../../../../lib/prisma";
import { getSession } from "../../../../lib/session";

export const DELETE = async (event: APIEvent) => {
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
      select: { 
        authorId: true,
        questionId: true // Pour supprimer aussi le tracking des questions
      }
    });

    if (!existingPost) {
      return new Response("Post introuvable", { status: 404 });
    }

    if (existingPost.authorId !== user.id) {
      return new Response("Vous ne pouvez supprimer que vos propres posts", { status: 403 });
    }

    // Utiliser une transaction pour supprimer le post et le tracking des questions
    await prisma.$transaction(async (tx) => {
      // Supprimer le tracking de question si c'était une réponse à une question
      if (existingPost.questionId) {
        await tx.userQuestionAnswer.deleteMany({
          where: {
            userId: user.id,
            questionId: existingPost.questionId,
            postId: postId
          }
        });
      }

      // Supprimer le post (les likes et commentaires seront supprimés automatiquement grâce au cascade)
      await tx.post.delete({
        where: { id: postId }
      });
    });

    console.log(`✅ Post ${postId} supprimé par l'utilisateur ${user.id}`);
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Erreur lors de la suppression du post:", error);
    return new Response("Erreur serveur", { status: 500 });
  }
};
import { APIEvent } from "@solidjs/start/server";
import prisma from "../../../lib/prisma";
import { getSession } from "../../../lib/session";

export const POST = async (event: APIEvent) => {
  'use server';
  
  const email = await getSession(event.request);
  if (!email) return new Response("Non authentifié", { status: 401 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return new Response("Utilisateur introuvable", { status: 404 });

  const formData = await event.request.formData();
  const title = formData.get("title") as string | null;
  const content = formData.get("content") as string | null;
  const privacy = formData.get("privacy") as string | null;
  const mediaType = formData.get("mediaType") as string | null;
  const mediaUrl = formData.get("mediaUrl") as string | null;
  const mediaMimeType = formData.get("mediaMimeType") as string | null;
  const questionId = formData.get("questionId") as string | null; // ✅ NOUVEAU

  console.log("Données du formulaire:", { title, content, privacy, questionId }); // Debug

  if (!title) return new Response("Titre manquant", { status: 400 });

  try {
    // ✅ NOUVEAU : Utiliser une transaction pour créer le post ET tracker la réponse
    const result = await prisma.$transaction(async (tx) => {
      // Créer le post
      const newPost = await tx.post.create({
        data: {
          title,
          content: content || "",
          mediaType,
          mediaUrl,
          mediaMimeType,
          authorId: user.id,
          questionId: questionId ? parseInt(questionId) : null, // ✅ NOUVEAU
        },
      });

      // ✅ NOUVEAU : Si c'est une réponse à une question, tracker cela
      if (questionId) {
        // Vérifier que l'utilisateur n'a pas déjà répondu à cette question
        const existingAnswer = await tx.userQuestionAnswer.findUnique({
          where: {
            userId_questionId: {
              userId: user.id,
              questionId: parseInt(questionId)
            }
          }
        });

        if (existingAnswer) {
          throw new Error("Vous avez déjà répondu à cette question");
        }

        // Créer l'enregistrement de réponse
        await tx.userQuestionAnswer.create({
          data: {
            userId: user.id,
            questionId: parseInt(questionId),
            postId: newPost.id
          }
        });

        console.log(`✅ Question ${questionId} marquée comme répondue par l'utilisateur ${user.id}`);
      }

      return newPost;
    });
    
    console.log("Post créé avec succès:", result.id); // Debug
    return new Response(JSON.stringify({ success: true, postId: result.id }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Erreur lors de la création du post:", error);
    if (error instanceof Error && error.message === "Vous avez déjà répondu à cette question") {
      return new Response(error.message, { status: 400 });
    }
    return new Response("Erreur serveur", { status: 500 });
  }
};
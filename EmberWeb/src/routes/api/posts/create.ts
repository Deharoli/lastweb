import { APIEvent } from "@solidjs/start/server";
import prisma from "../../../lib/prisma";
import { getSession } from "../../../lib/session";

export const POST = async (event: APIEvent) => {
  'use server';
  
  console.log("API create appelée"); // Debug
  
  const email = await getSession(event.request);
  console.log("Email récupéré de la session:", email); // Debug
  
  if (!email) return new Response("Non authentifié", { status: 401 });

  const user = await prisma.user.findUnique({ where: { email } });
  console.log("Utilisateur trouvé:", user ? `${user.name} (${user.email})` : "Non trouvé"); // Debug
  
  if (!user) return new Response("Utilisateur introuvable", { status: 404 });

  const formData = await event.request.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string | null;
  const privacy = formData.get("privacy") as string | null;
  const mediaType = formData.get("mediaType") as string | null;
  const mediaUrl = formData.get("mediaUrl") as string | null;
  const mediaMimeType = formData.get("mediaMimeType") as string | null;

  console.log("Données du formulaire:", { title, content, privacy }); // Debug

  if (!title) return new Response("Titre manquant", { status: 400 });

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content: content || "",
        mediaType,
        mediaUrl,
        mediaMimeType,
        authorId: user.id,
      },
    });
    
    console.log("Post créé avec succès:", newPost.id); // Debug
    return new Response("Post créé avec succès", { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la création du post:", error);
    return new Response("Erreur serveur", { status: 500 });
  }
};
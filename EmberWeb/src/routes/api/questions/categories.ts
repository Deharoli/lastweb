import { APIEvent } from "@solidjs/start/server";
import { getSession } from "../../../lib/session";
import prisma from "../../../lib/prisma";

export const GET = async (event: APIEvent) => {
  'use server';
  
  const email = await getSession(event.request);
  if (!email) return new Response("Non authentifié", { status: 401 });

  try {
    console.log("🔍 Recherche des catégories...");
    
    const categories = await prisma.questionCategory.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { questions: true }
        }
      },
      orderBy: { createdAt: "asc" }
    });

    console.log("📊 Catégories trouvées:", categories.length);

    return new Response(JSON.stringify(categories), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("❌ Erreur récupération catégories:", error);
    return new Response("Erreur serveur", { status: 500 });
  }
};
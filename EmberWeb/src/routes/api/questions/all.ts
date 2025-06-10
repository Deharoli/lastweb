import { APIEvent } from "@solidjs/start/server";
import { getSession } from "../../../lib/session";
import prisma from "../../../lib/prisma";

export const GET = async (event: APIEvent) => {
  'use server';
  
  const email = await getSession(event.request);
  if (!email) return new Response("Non authentifié", { status: 401 });

  try {
    // Récupérer l'utilisateur connecté
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return new Response("Utilisateur introuvable", { status: 404 });

    // Récupérer les paramètres de pagination depuis l'URL
    const url = new URL(event.request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '5');
    const categoryId = url.searchParams.get('categoryId');
    
    const skip = (page - 1) * limit;

    console.log(`🔍 Récupération des questions - Page: ${page}, Limit: ${limit}, Category: ${categoryId || 'all'}, User: ${user.id}`);
    
    // ✅ NOUVEAU : Récupérer les IDs des questions déjà répondues par l'utilisateur
    const answeredQuestionIds = await prisma.userQuestionAnswer.findMany({
      where: { userId: user.id },
      select: { questionId: true }
    });

    const answeredIds = answeredQuestionIds.map(answer => answer.questionId);
    console.log(`📝 Questions déjà répondues par l'utilisateur: ${answeredIds.length}`);

    // Construire la condition where
    const whereCondition: any = { 
      isActive: true,
      id: { notIn: answeredIds } // ✅ EXCLURE les questions déjà répondues
    };
    if (categoryId && categoryId !== 'null') {
      whereCondition.categoryId = parseInt(categoryId);
    }

    // Récupérer les questions avec pagination
    const [questions, totalCount] = await Promise.all([
      prisma.question.findMany({
        where: whereCondition,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              emoji: true,
              color: true
            }
          }
        },
        orderBy: [
          { category: { name: "asc" } },
          { createdAt: "desc" }
        ],
        skip,
        take: limit
      }),
      prisma.question.count({
        where: whereCondition
      })
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;

    console.log(`📊 Questions disponibles: ${questions.length}/${totalCount}, Page ${page}/${totalPages}`);

    return new Response(JSON.stringify({
      questions,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage,
        limit,
        answeredCount: answeredIds.length // ✅ Info supplémentaire
      }
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("❌ Erreur récupération questions:", error);
    return new Response("Erreur serveur", { status: 500 });
  }
};
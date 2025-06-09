// routes/[slug]/feed.tsx
import { cache, createAsync, redirect } from "@solidjs/router";
import Feed from "../../../components/Feed/Feed";
import BottomBar from "../../../components/MenuBar/BottomBar";
import Navbar from "../../../components/MenuBar/Navbar";

// Fonction cachée qui s'exécute côté serveur uniquement
const getPosts = cache(async () => {
  "use server";
  const { PrismaClient } = await import("@prisma/client");
  const { getRequestEvent } = await import("solid-js/web");
  const { getSession } = await import("../../../lib/session");
  
  const prisma = new PrismaClient();
  
  try {
    const event = getRequestEvent();
    if (!event) return [];
    
    const email = await getSession(event.request);
    
    // ✅ PROTECTION : Redirige vers login si pas de session
    if (!email) {
      throw redirect("/pages/auth");
    }
    
    const posts = await prisma.post.findMany({
      include: { 
        author: {
          select: { id: true, name: true }
        },
        likes: {
          include: {
            user: {
              select: { id: true, name: true }
            }
          }
        },
        comments: {
          include: {
            user: {
              select: { id: true, name: true }
            }
          },
          orderBy: { createdAt: "desc" },
          take: 3 // Limite à 3 commentaires par défaut
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    // Ajoute l'info si l'utilisateur connecté a liké chaque post
    const currentUser = await prisma.user.findUnique({ where: { email } });
    if (!currentUser) {
      throw redirect("/pages/auth");
    }

    const postsWithUserLikeStatus = posts.map(post => ({
      ...post,
      isLikedByCurrentUser: post.likes.some(like => like.user.id === currentUser.id)
    }));

    return postsWithUserLikeStatus;
  } finally {
    await prisma.$disconnect();
  }
}, "posts");

export default function FeedPage() {
  const posts = createAsync(() => getPosts());
  
  return (
    <>
      <Navbar />
      <Feed posts={posts() || []} />
      <BottomBar />
    </>
  );
}

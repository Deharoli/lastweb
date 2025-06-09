import { cache, createAsync, redirect } from "@solidjs/router";
import ProfilePage from "../../../components/Profile/Profile";
import BottomBar from "../../../components/MenuBar/BottomBar";
import Navbar from "../../../components/MenuBar/Navbar";

// Fonction cachée qui s'exécute côté serveur uniquement
const getUserProfile = cache(async () => {
  "use server";
  const { PrismaClient } = await import("@prisma/client");
  const { getRequestEvent } = await import("solid-js/web");
  
  const prisma = new PrismaClient();
  
  try {
    // Récupère l'event de la requête courante
    const event = getRequestEvent();
    if (!event) return null;
    
    // Récupère l'email depuis la session
    const { getSession } = await import("../../../lib/session");
    const email = await getSession(event.request);
    
    // ✅ PROTECTION : Redirige vers login si pas de session
    if (!email) {
      throw redirect("/pages/auth");
    }
    
    // Récupère l'utilisateur et ses posts avec les mêmes données que le feed
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        posts: {
          include: {
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
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) {
      throw redirect("/pages/auth");
    }

    // Ajoute l'info si l'utilisateur connecté a liké chaque post (toujours true pour ses propres posts)
    const postsWithUserLikeStatus = user.posts.map(post => ({
      ...post,
      isLikedByCurrentUser: post.likes.some(like => like.user.id === user.id),
      author: { name: user.name } // Ajoute l'auteur
    }));

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        officialID: user.officialID,
        createdAt: user.createdAt,
      },
      posts: postsWithUserLikeStatus,
      stats: {
        totalPosts: user.posts.length,
        totalLikes: user.posts.reduce((sum, post) => sum + post._count.likes, 0), // ✅ Vrais likes
        activeDays: Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)),
      },
    };
  } finally {
    await prisma.$disconnect();
  }
}, "userProfile");

export default function ProfilRoute() {
  const profileData = createAsync(() => getUserProfile());
  
  return (
    <>
      <Navbar />
      <ProfilePage profileData={profileData()} />
      <BottomBar />
    </>
  );
}
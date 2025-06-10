import { For, Show, createSignal, createEffect } from "solid-js";
import ContentCard, { Content } from "../Feed/ContentCard";

type ProfileContentProps = {
  activeTab: string;
  posts?: Array<{
    id: number;
    title: string;
    content: string | null;
    mediaType: string | null;
    mediaUrl: string | null;
    createdAt: Date;
    isLikedByCurrentUser: boolean;
    author: {
      name: string;
    };
    _count: {
      likes: number;
      comments: number;
    };
    comments: Array<{
      id: number;
      content: string;
      user: { name: string };
      createdAt: string;
    }>;
  }>;
  currentUserName?: string;
  onPostsChange?: () => void;
};

const ProfileContent = (props: ProfileContentProps) => {
  const [posts, setPosts] = createSignal(props.posts || []);

  // ✅ NOUVEAU : Effet pour synchroniser avec les props
  createEffect(() => {
    if (props.posts) {
      console.log("🔄 Props posts updated:", props.posts);
      setPosts(props.posts);
    }
  });

  // ✅ Fonction pour modifier un post
  const handleEditPost = async (postId: number, title: string, content: string) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      const response = await fetch(`/api/posts/${postId}/edit`, {
        method: "PUT",
        body: formData
      });

      if (response.ok) {
        console.log("✅ Post modifié avec succès");
        const updatedPost = await response.json();
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, title: updatedPost.title, content: updatedPost.content }
            : post
        ));
        
        if (props.onPostsChange) {
          props.onPostsChange();
        }
      } else {
        const errorText = await response.text();
        console.error("❌ Erreur modification:", errorText);
        alert("Erreur lors de la modification: " + errorText);
      }
    } catch (error) {
      console.error("❌ Erreur réseau:", error);
      alert("Erreur de connexion");
    }
  };

  // ✅ Fonction pour supprimer un post
  const handleDeletePost = async (postId: number) => {
    try {
      const response = await fetch(`/api/posts/${postId}/delete`, {
        method: "DELETE"
      });

      if (response.ok) {
        console.log("✅ Post supprimé avec succès");
        setPosts(prev => prev.filter(post => post.id !== postId));
        
        if (props.onPostsChange) {
          props.onPostsChange();
        }
      } else {
        const errorText = await response.text();
        console.error("❌ Erreur suppression:", errorText);
        alert("Erreur lors de la suppression: " + errorText);
      }
    } catch (error) {
      console.error("❌ Erreur réseau:", error);
      alert("Erreur de connexion");
    }
  };

  const filteredPosts = () => {
    const currentPosts = posts();
    console.log("📊 Current posts:", currentPosts); // Debug
    if (!currentPosts || currentPosts.length === 0) return [];

    if (props.activeTab === "all") {
      return currentPosts;
    }

    return currentPosts.filter((post) => 
      post.mediaType === props.activeTab || 
      (props.activeTab === "text" && !post.mediaType)
    );
  };

  console.log("🏷️ Active tab:", props.activeTab); // Debug
  console.log("📝 Filtered posts:", filteredPosts()); // Debug

  return (
    <div class="space-y-6">
      <Show
        when={filteredPosts().length > 0}
        fallback={
          <div class="text-center py-12 text-gray-500">
            <div class="text-6xl mb-4">📝</div>
            <h3 class="text-xl font-semibold mb-2">Aucune réponse pour l'instant</h3>
            <p class="text-gray-400">Commence à répondre aux questions pour voir tes posts ici !</p>
          </div>
        }
      >
        <For each={filteredPosts()}>
          {(post) => (
            <ContentCard
              content={{
                id: post.id,
                username: post.author.name,
                type: (post.mediaType as any) || "text",
                src: post.mediaUrl || "",
                question: post.title,
                text: post.content || "",
                time: new Date(post.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                privacy: "public",
                reactions: post._count?.likes || 0,
                commentsCount: post._count?.comments || 0,
                isLikedByCurrentUser: post.isLikedByCurrentUser || false,
                comments: post.comments?.map(comment => ({
                  id: comment.id,
                  content: comment.content,
                  user: comment.user,
                  createdAt: comment.createdAt
                })) || [],
                // ✅ Props pour les actions
                isOwnPost: true,
                currentUserName: props.currentUserName,
                onEdit: handleEditPost,
                onDelete: handleDeletePost,
              }}
            />
          )}
        </For>
      </Show>
    </div>
  );
};

export default ProfileContent;
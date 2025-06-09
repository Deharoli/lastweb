import { For, Show } from "solid-js";
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
    isLikedByCurrentUser: boolean; // ✅ Ajout
    author: {
      name: string;
    };
    _count: {
      likes: number;
      comments: number;
    }; // ✅ Ajout
    comments: Array<{
      id: number;
      content: string;
      user: { name: string };
      createdAt: string;
    }>; // ✅ Ajout
  }>;
};

const ProfileContent = (props: ProfileContentProps) => {
  const filteredPosts = () => {
    if (!props.posts) return [];

    if (props.activeTab === "all") {
      return props.posts;
    }

    return props.posts.filter((post) => post.mediaType === props.activeTab || (props.activeTab === "text" && !post.mediaType));
  };

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
                id: post.id, // ✅ Passe l'ID du post
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
                reactions: post._count?.likes || 0, // ✅ Vrais likes
                commentsCount: post._count?.comments || 0, // ✅ Vrais commentaires
                isLikedByCurrentUser: post.isLikedByCurrentUser || false, // ✅ Statut du like
                comments: post.comments?.map(comment => ({
                  id: comment.id,
                  content: comment.content,
                  user: comment.user,
                  createdAt: comment.createdAt
                })) || [], // ✅ Commentaires
              }}
            />
          )}
        </For>
      </Show>
    </div>
  );
};

export default ProfileContent;
import { Component, For, createSignal, Show } from 'solid-js';
import ContentCard from './ContentCard';
import type { Content } from './ContentCard';
import FeedTabs from './FeedTabs';

const Feed: Component = (props: { posts: any[] }) => {
  const [activeTab, setActiveTab] = createSignal("all");

  const filteredContent = () => {
    if (activeTab() === "all") {
      return props.posts;
    }
    
    return props.posts.filter(post => 
      post.mediaType === activeTab() || 
      (activeTab() === "text" && !post.mediaType)
    );
  };

  return (
    <div class="bg-[#f5f5f7] min-h-screen flex flex-col items-center pt-10 px-5">
      <div class="w-full max-w-4xl mx-auto pt-20 px-4">
        <FeedTabs activeTab={activeTab()} setActiveTab={setActiveTab} />
        
        <Show
          when={filteredContent().length > 0}
          fallback={
            <div class="text-center py-12 text-gray-500">
              <div class="text-6xl mb-4">📝</div>
              <h3 class="text-xl font-semibold mb-2">Aucune réponse pour l'instant</h3>
              <p class="text-gray-400">
                {activeTab() === "all" 
                  ? "Soyez le premier à partager vos réponses !" 
                  : `Aucune réponse ${activeTab() === "video" ? "vidéo" : activeTab() === "audio" ? "audio" : "texte"} pour le moment.`}
              </p>
            </div>
          }
        >
          <For each={filteredContent()}>{(post) => (
            <ContentCard
              content={{
                id: post.id, // ✅ Passe l'ID du post
                username: post.author?.name || "Anonyme",
                type: (post.mediaType as any) || "text",
                src: post.mediaUrl || "",
                question: post.title,
                time: new Date(post.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit"
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
                text: post.content,
              }}
            />
          )}</For>
        </Show>
      </div>
    </div>
  );
};

export default Feed;

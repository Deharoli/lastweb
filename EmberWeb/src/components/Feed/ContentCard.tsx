import { Component, Show, For, createSignal } from 'solid-js';

export type Content = {
  id: number; // ✅ Ajoute l'ID du post
  username: string;
  type: 'video' | 'audio' | 'image' | 'text';
  src: string;
  question?: string;
  text?: string;
  avatarUrl?: string;
  time?: string;
  privacy?: 'public' | 'friends' | 'close' | 'private';
  emotions?: string[];
  reactions: number; // Nombre de likes
  commentsCount: number; // Nombre de commentaires
  isLikedByCurrentUser: boolean; // ✅ Si l'utilisateur a liké
  comments?: Array<{
    id: number;
    content: string;
    user: { name: string };
    createdAt: string;
  }>; // ✅ Commentaires
  reactedBy?: string;
};

const privacyIcon = {
  public: <><i class="fas fa-globe-europe"></i> Public</>,
  friends: <><i class="fas fa-users"></i> Friends</>,
  close: <><i class="fas fa-user-friends"></i> Close Friends</>,
  private: <><i class="fas fa-lock"></i> Private</>,
};

const ContentCard: Component<{ content: Content }> = ({ content }) => {
  const [isLiked, setIsLiked] = createSignal(content.isLikedByCurrentUser);
  const [likesCount, setLikesCount] = createSignal(content.reactions);
  const [showComments, setShowComments] = createSignal(false);
  const [newComment, setNewComment] = createSignal("");
  const [comments, setComments] = createSignal(content.comments || []);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/posts/${content.id}/like`, {
        method: "POST"
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsLiked(data.liked);
        setLikesCount(prev => data.liked ? prev + 1 : prev - 1);
      }
    } catch (error) {
      console.error("Erreur lors du like:", error);
    }
  };

  const handleComment = async (e: Event) => {
    e.preventDefault();
    if (!newComment().trim()) return;

    try {
      const formData = new FormData();
      formData.append("content", newComment());

      const response = await fetch(`/api/posts/${content.id}/comments`, {
        method: "POST",
        body: formData
      });
      
      if (response.ok) {
        const comment = await response.json();
        setComments(prev => [comment, ...prev]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Erreur lors du commentaire:", error);
    }
  };

  return (
    <div class="ember-post bg-white rounded-[15px] p-[15px] mb-[15px] border border-[rgba(0,0,0,0.05)] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
      {/* Header */}
      <div class="post-header flex items-center mb-2">
        <div class="post-avatar w-10 h-10 rounded-full bg-gradient-to-r from-[#FF5F76] to-[#FF914D] mr-2 flex items-center justify-center text-white font-semibold text-lg">
          {content.avatarUrl
            ? <img src={content.avatarUrl} alt={content.username} class="w-9 h-9 rounded-full object-cover border-2 border-white" />
            : content.username[0]}
        </div>
        <div class="post-user-info flex-1">
          <div class="post-username font-semibold text-sm">{content.username}</div>
          <div class="post-time text-xs opacity-70">{content.time || "now"}</div>
        </div>
        <div class="post-privacy text-xs px-2 py-1 rounded-[10px] bg-[rgba(0,0,0,0.05)] text-[#666] flex items-center gap-1">
          {privacyIcon[content.privacy || "public"]}
        </div>
      </div>
      
      {/* Content */}
      <div class="post-content text-[0.95rem] leading-[1.5] my-2 text-[#232a34]">
        <div class="font-semibold text-gray-800 mb-2">
          {content.question}
        </div>
        
        <Show when={content.text}>
          <div class="text-gray-700">
            {content.text}
          </div>
        </Show>
        
        <Show when={content.emotions}>
          <div class="mt-2">
            <For each={content.emotions}>
              {emotion => <span class="emotion-tag inline-block px-2 py-1 rounded-[15px] text-xs mr-1 mb-1 bg-[rgba(255,95,118,0.1)] text-[#FF5F76]">#{emotion}</span>}
            </For>
          </div>
        </Show>
      </div>
      
      {/* Media - Existing code */}
      
      {/* Reactions */}
      <div class="post-reactions flex justify-between items-center mt-4 pt-2 border-t border-[rgba(0,0,0,0.05)]">
        <div class="reaction-count text-xs text-[#666] flex items-center">
          <i class="fas fa-heart text-[#FF5F76] mr-1"></i> {likesCount()}
        </div>
        <div class="post-actions flex gap-4">
          <button 
            class={`post-action text-lg cursor-pointer transition ${
              isLiked() ? "text-[#FF5F76]" : "text-[#666] hover:text-[#FF5F76]"
            }`}
            onClick={handleLike}
          >
            <i class={isLiked() ? "fas fa-heart" : "far fa-heart"}></i>
          </button>
          <button 
            class="post-action text-lg text-[#666] hover:text-[#FF5F76] cursor-pointer"
            onClick={() => setShowComments(!showComments())}
          >
            <i class="far fa-comment"></i>
          </button>
          {/* ❌ SUPPRESSION DU BOUTON PARTAGE */}
        </div>
      </div>
      
      {/* Comments */}
      <div class="post-comments mt-2 text-xs text-[#666]">
        <button 
          class="view-comments cursor-pointer hover:underline"
          onClick={() => setShowComments(!showComments())}
        >
          {showComments() ? "Masquer" : "Voir"} les {content.commentsCount} commentaires
        </button>
      </div>

      {/* Comments Section */}
      <Show when={showComments()}>
        <div class="comments-section mt-3 pt-3 border-t border-gray-100">
          {/* Comment Form */}
          <form onSubmit={handleComment} class="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Ajouter un commentaire..."
              value={newComment()}
              onInput={e => setNewComment(e.currentTarget.value)}
              class="flex-1 px-3 py-2 border text-black border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5F76]"
            />
            <button
              type="submit"
              disabled={!newComment().trim()}
              class="px-4 py-2 bg-[#FF5F76] text-white rounded-full text-sm disabled:opacity-50"
            >
              <i class="fas fa-paper-plane"></i>
            </button>
          </form>

          {/* Comments List */}
          <For each={comments()}>
            {(comment) => (
              <div class="comment flex gap-2 mb-2 text-sm">
                <div class="comment-avatar w-6 h-6 rounded-full bg-gradient-to-r from-[#FF5F76] to-[#FF914D] flex items-center justify-center text-white text-xs">
                  {comment.user.name[0]}
                </div>
                <div class="comment-content flex-1">
                  <span class="font-semibold">{comment.user.name}</span>
                  <span class="ml-2 text-gray-700">{comment.content}</span>
                  <div class="text-xs text-gray-500 mt-1">
                    {new Date(comment.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default ContentCard;

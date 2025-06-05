import { Component, Show, createSignal,For } from 'solid-js';

export type Content = {
  username: string;
  type: 'video' | 'audio' | 'image' | 'text';
  src: string;
  question?: string;
};

const ContentCard: Component<{ content: Content }> = ({ content }) => {
  const [likes, setLikes] = createSignal(0);
  const [comments, setComments] = createSignal<string[]>([]);
  const [newComment, setNewComment] = createSignal('');

  const addComment = () => {
    if (newComment().trim() !== '') {
      setComments([...comments(), newComment()]);
      setNewComment('');
    }
  };

  return (
    <div class="bg-white p-5 rounded-xl shadow-md mb-5">
      <h3 class="text-lg font-semibold mb-2">{content.username}</h3>
      <Show when={content.question}>
        <p class="text-sm text-gray-500 mb-2">{content.question}</p>
      </Show>
      <Show when={content.type === 'video'}>
        <video controls src={content.src} class="w-full rounded-md mb-3" />
      </Show>
      <Show when={content.type === 'audio'}>
        <audio controls src={content.src} class="w-full rounded-md mb-3" />
      </Show>
      <Show when={content.type === 'image'}>
        <img src={content.src} alt="media" class="w-full rounded-md mb-3" />
      </Show>
      <Show when={content.type === 'text'}>
        <p class="text-base text-gray-800 mb-3">{content.src}</p>
      </Show>

      <div class="flex items-center gap-4 mb-3">
        <button onClick={() => setLikes(likes() + 1)} class="text-pink-600 font-semibold flex items-center gap-1">
          <i class="fas fa-heart"></i> {likes()}
        </button>
      </div>

      <div class="mb-2">
        <input
          type="text"
          placeholder="Ajouter un commentaire..."
          value={newComment()}
          onInput={(e) => setNewComment(e.currentTarget.value)}
          class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        <button onClick={addComment} class="mt-2 text-sm text-white bg-gradient-to-r from-[#FF5F76] to-[#FF914D] px-4 py-1 rounded">
          Commenter
        </button>
      </div>

      <div class="mt-3 space-y-2">
        <For each={comments()}>{(comment) => <p class="text-sm text-gray-700">💬 {comment}</p>}</For>
      </div>
    </div>
  );
};

export default ContentCard;

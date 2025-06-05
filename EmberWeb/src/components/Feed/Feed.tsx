import { Component, For } from 'solid-js';
import ContentCard from './ContentCard';
import type { Content } from './ContentCard';

const Feed: Component = () => {
  const contentList: Content[] = [
    { username: 'Sarah', type: 'video', src: 'sample1.mp4', question: 'Quel est ton moment préféré ?' },
    { username: 'David', type: 'audio', src: 'sample2.mp3' },
    { username: 'Léa', type: 'image', src: 'image1.jpg' },
    { username: 'Yassine', type: 'text', src: 'Ce jour-là, j’ai compris que le silence valait parfois plus que mille mots.' }
  ];

  return (
    <div class="bg-[#f5f5f7] min-h-screen flex flex-col items-center pt-10 px-5">
      <div class="w-full max-w-xl">
        <For each={contentList}>{(item) => <ContentCard content={item} />}</For>
      </div>
      <button
        class="fixed bottom-6 right-6 bg-gradient-to-r from-[#FF5F76] to-[#FF914D] text-white w-14 h-14 rounded-full shadow-lg text-2xl flex items-center justify-center hover:scale-105 transition"
        onClick={() => (window.location.href = 'enregistrement.html')}
      >
        <i class="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default Feed;

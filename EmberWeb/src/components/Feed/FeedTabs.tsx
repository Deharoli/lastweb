import { For } from "solid-js";

const tabs = [
  { key: "all", label: "Toutes les réponses" },
  { key: "video", label: "Vidéos" },
  { key: "audio", label: "Audio" },
  { key: "text", label: "Texte" },
];

const FeedTabs = (props: { activeTab: string; setActiveTab: (key: string) => void }) => (
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
    <div class="flex border-b border-gray-100">
      <For each={tabs}>
        {(tab) => (
          <button
            class={`flex-1 px-6 py-4 text-center font-medium transition-all ${
              props.activeTab === tab.key
                ? "text-red-500 border-b-2 border-red-500 bg-red-50/50"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => props.setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        )}
      </For>
    </div>
  </div>
);

export default FeedTabs;
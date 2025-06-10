import { For } from "solid-js";

type ProfileTabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void; // ✅ CORRECTION : Utiliser onTabChange au lieu de setActiveTab
};

const ProfileTabs = (props: ProfileTabsProps) => {
  const tabs = [
    { key: "all", label: "Tout", icon: "fas fa-th" },
    { key: "text", label: "Texte", icon: "fas fa-align-left" },
    { key: "image", label: "Photos", icon: "fas fa-image" },
    { key: "video", label: "Vidéos", icon: "fas fa-video" },
    { key: "audio", label: "Audio", icon: "fas fa-volume-up" },
  ];

  return (
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
      <div class="flex overflow-x-auto">
        <For each={tabs}>
          {(tab) => (
            <button
              class={`flex-1 px-6 py-4 text-center font-medium transition-all ${
                props.activeTab === tab.key
                  ? "text-red-500 border-b-2 border-red-500 bg-red-50/50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => props.onTabChange(tab.key)} // ✅ CORRECTION : Utiliser onTabChange
            >
              <i class={`${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          )}
        </For>
      </div>
    </div>
  );
};

export default ProfileTabs;
import { Show } from "solid-js";

type ProfileHeaderProps = {
  user?: {
    name: string;
    email: string;
    officialID: string | null;
  };
  stats?: {
    totalPosts: number;
    totalLikes: number;
    activeDays: number;
  };
};

const ProfileHeader = (props: ProfileHeaderProps) => (
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
    <div class="h-32 gradient-bg relative">
      <button
        class="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all"
        aria-label="Paramètres"
      >
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      </button>
    </div>
    <div class="px-6 pb-6">
      <div class="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-12">
        <div class="relative">
          <div class="w-24 h-24 bg-red-400 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
            {props.user?.name?.[0] || "U"}
          </div>
          <button class="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 hover:bg-gray-50">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </button>
        </div>
        <div class="flex-1 mt-4 sm:mt-0">
          <h2 class="text-2xl font-bold text-gray-900">
            {props.user?.name || "Utilisateur"}
          </h2>
          <p class="text-gray-600 mt-1">
            {props.user?.officialID || "@" + (props.user?.name?.toLowerCase().replace(/\s+/g, '_') || "user")}
          </p>
          <p class="text-gray-700 mt-2">
            Membre d'Ember - Partage tes moments authentiques ✨
          </p>
        </div>
      </div>
      <div class="flex space-x-8 mt-6 pt-6 border-t border-gray-100">
        <div class="text-center">
          <div class="text-xl font-bold text-gray-900">
            {props.stats?.totalPosts || 0}
          </div>
          <div class="text-sm text-gray-600">Réponses</div>
        </div>
        <div class="text-center">
          <div class="text-xl font-bold text-gray-900">
            {props.stats?.totalLikes || 0}
          </div>
          <div class="text-sm text-gray-600">Likes reçus</div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileHeader;
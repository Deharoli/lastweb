import { useLocation, useNavigate, useParams } from "@solidjs/router";

export default function BottomBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams(); // récupère le slug dynamique

  // Fallback si params.slug n'est pas défini (ex: sur la landing page)
  const slug = params.slug;

  return (
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div class="max-w-4xl mx-auto flex justify-around items-center">
        <button
          class={`flex flex-col items-center space-y-1 p-2 ${
            location.pathname.includes("/feed") ? "text-red-500" : "text-gray-500 hover:text-red-500"
          }`}
          onClick={() => navigate(`/pages/${slug}/feed`)}
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span class="text-xs">Feed</span>
        </button>
        <button
          class={`flex flex-col items-center space-y-1 p-2 ${
            location.pathname.includes("/question") ? "text-red-500" : "text-gray-500 hover:text-red-500"
          }`}
          onClick={() => navigate(`/pages/${slug}/questions`)}
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-xs">Questions</span>
        </button>
        <button
          class={`flex flex-col items-center space-y-1 p-2 ${
            location.pathname.includes("/profil") ? "text-red-500" : "text-gray-500 hover:text-red-500"
          }`}
          onClick={() => navigate(`/pages/${slug}/profil`)}
        >
          <svg class="w-6 h-6 fill-current" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <span class="text-xs">Profil</span>
        </button>
      </div>
    </nav>
  );
}
import { createSignal, createResource, For, Show, onMount } from "solid-js";
import QuestionCard from "./QuestionCard";
import { useInfiniteQuestions } from "./useInfiniteQuestions";
import LoadingSpinner from "./LoadingSpinner";

type Category = {
  id: number;
  name: string;
  emoji: string;
  color: string;
};

// Fetch des catégories
async function fetchCategories(): Promise<Category[]> {
  try {
    console.log("🏷️ Fetching categories...");
    const response = await fetch("/api/questions/categories");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    console.log("🏷️ Categories received:", data);
    return data;
  } catch (error) {
    console.error("❌ Erreur fetch catégories:", error);
    return [];
  }
}

export default function QuestionsPage() {
  const [selectedCategoryId, setSelectedCategoryId] = createSignal<number | null>(null);
  const [isPageReady, setIsPageReady] = createSignal(false);
  
  // ✅ Resource des catégories
  const [categories, { refetch: refetchCategories }] = createResource(fetchCategories);
  
  // ✅ Utiliser le hook de pagination infinie
  const {
    questions,
    isLoading,
    isLoadingMore,
    hasNextPage,
    totalCount,
    answeredCount,
    loadMore,
    refreshAfterAnswer,
    isInitialized
  } = useInfiniteQuestions(selectedCategoryId);

  // ✅ Initialisation de la page
  onMount(() => {
    console.log("🚀 QuestionsPage mounted");
    setIsPageReady(true);
  });

  const handleQuestionAnswered = () => {
    console.log("✅ Question answered, refreshing...");
    
    // ✅ Refresh des questions avec un petit délai pour la DB
    setTimeout(() => {
      refreshAfterAnswer();
      // ✅ Optionnel : Refresh des catégories aussi
      refetchCategories();
    }, 300);
  };

  const handleCategoryChange = (categoryId: number | null) => {
    console.log("🏷️ Category change to:", categoryId);
    setSelectedCategoryId(categoryId);
  };

  return (
    <div class="min-h-screen bg-[#f5f5f7] pt-20">
      <div class="w-full max-w-4xl mx-auto px-4 py-6 pb-24">
        
        {/* Header */}
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold mb-4 bg-gradient-to-r from-[#FF5F76] to-[#FF914D] bg-clip-text text-transparent">
            Questions Ember
          </h1>
          <p class="text-gray-600">
            Choisis une catégorie ou explore toutes les questions
          </p>
          {/* ✅ Afficher le nombre de questions répondues */}
          <Show when={answeredCount() > 0 && isInitialized()}>
            <p class="text-sm text-green-600 mt-2">
              🎉 Vous avez répondu à {answeredCount()} question{answeredCount() > 1 ? 's' : ''} !
            </p>
          </Show>
        </div>

        {/* Barre de sélection des catégories */}
        <Show when={isPageReady()}>
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-4">
            <div class="flex flex-wrap gap-2">
              {/* Bouton "Toutes" */}
              <button
                class={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategoryId() === null
                    ? "bg-gradient-to-r from-[#FF5F76] to-[#FF914D] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => handleCategoryChange(null)}
              >
                🔍 Toutes les questions
              </button>
              
              {/* Boutons des catégories */}
              <Show when={categories() && categories()!.length > 0}>
                <For each={categories()}>
                  {(category) => (
                    <button
                      class={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategoryId() === category.id
                          ? "text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      style={selectedCategoryId() === category.id ? { background: category.color } : {}}
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      {category.emoji} {category.name}
                    </button>
                  )}
                </For>
              </Show>
            </div>
          </div>
        </Show>

        {/* Compteur de questions */}
        <Show when={!isLoading() && isInitialized()}>
          <div class="text-center mb-6 text-gray-600">
            {questions().length} question{questions().length > 1 ? 's' : ''} disponible{questions().length > 1 ? 's' : ''}
            {totalCount() > 0 && totalCount() !== questions().length && (
              <span> sur {totalCount()} au total</span>
            )}
            {selectedCategoryId() !== null && (
              <span> dans cette catégorie</span>
            )}
          </div>
        </Show>

        {/* Liste des questions */}
        <Show 
          when={!isLoading()}
          fallback={<LoadingSpinner text="Chargement des questions..." size="lg" />}
        >
          <Show 
            when={questions().length > 0} 
            fallback={
              <Show when={isInitialized()}>
                <div class="text-center py-12 text-gray-500">
                  <div class="text-6xl mb-4">🤔</div>
                  <h3 class="text-xl font-semibold mb-2">Aucune question disponible</h3>
                  <p class="text-gray-400">Cette catégorie sera bientôt enrichie !</p>
                </div>
              </Show>
            }
          >
            <div class="space-y-4">
              <For each={questions()}>
                {(question) => (
                  <QuestionCard
                    question={question.text}
                    questionId={question.id}
                    categoryEmoji={question.category.emoji}
                    onQuestionAnswered={handleQuestionAnswered}
                  />
                )}
              </For>
            </div>

            {/* ✅ Chargement avec logo Ember pour "load more" */}
            <Show when={hasNextPage()}>
              <div class="text-center mt-8">
                <Show when={isLoadingMore()}>
                  <LoadingSpinner text="Chargement de nouvelles questions..." size="md" />
                </Show>
                
                <Show when={!isLoadingMore()}>
                  <button
                    onClick={loadMore}
                    class="px-6 py-3 bg-gradient-to-r from-[#FF5F76] to-[#FF914D] text-white rounded-full font-medium transition hover:shadow-lg"
                  >
                    <i class="fas fa-chevron-down mr-2"></i>
                    Charger plus de questions
                  </button>
                </Show>
              </div>
            </Show>

            {/* Message de fin */}
            <Show when={!hasNextPage() && questions().length > 0}>
              <div class="text-center mt-8 py-6 text-gray-500">
                <div class="text-2xl mb-2">🎉</div>
                <p>Vous avez vu toutes les questions disponibles !</p>
              </div>
            </Show>
          </Show>
        </Show>
      </div>
    </div>
  );
}
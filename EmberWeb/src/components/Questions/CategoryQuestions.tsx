import { For, createResource, Show } from "solid-js";
import QuestionCard from "./QuestionCard";

type Question = {
  id: number;
  text: string;
  category: {
    name: string;
    emoji: string;
    color: string;
  };
};

// ✅ Utiliser l'API REST au lieu de cache server
async function fetchQuestionsByCategory(categoryId: number): Promise<Question[]> {
  try {
    const response = await fetch(`/api/questions/by-category/${categoryId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors du fetch des questions:", error);
    return [];
  }
}

type CategoryQuestionsProps = {
  categoryId: number;
  categoryName: string;
  onBack: () => void;
  onQuestionAnswered: () => void;
};

const CategoryQuestions = (props: CategoryQuestionsProps) => {
  const [questions] = createResource(() => props.categoryId, fetchQuestionsByCategory);

  return (
    <div class="max-w-4xl mx-auto">
      <div class="mb-6">
        <button
          onClick={props.onBack}
          class="flex items-center text-gray-600 hover:text-[#FF5F76] transition-colors mb-4"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          Retour aux catégories
        </button>
        <h2 class="text-3xl font-bold bg-gradient-to-r from-[#FF5F76] to-[#FF914D] bg-clip-text text-transparent">
          {props.categoryName}
        </h2>
      </div>

      <Show when={questions()} fallback={
        <div class="space-y-4">
          {[...Array(3)].map(() => (
            <div class="bg-gray-200 rounded-xl p-6 h-32 animate-pulse"></div>
          ))}
        </div>
      }>
        <div class="space-y-4">
          <For each={questions()}>
            {(question) => (
              <QuestionCard
                question={question.text}
                questionId={question.id}
                categoryEmoji={question.category.emoji}
                onQuestionAnswered={props.onQuestionAnswered}
              />
            )}
          </For>
        </div>

        <Show when={questions()?.length === 0}>
          <div class="text-center py-12 text-gray-500">
            <div class="text-6xl mb-4">🤔</div>
            <h3 class="text-xl font-semibold mb-2">Aucune question disponible</h3>
            <p class="text-gray-400">Cette catégorie sera bientôt enrichie avec de nouvelles questions !</p>
          </div>
        </Show>
      </Show>
    </div>
  );
};

export default CategoryQuestions;
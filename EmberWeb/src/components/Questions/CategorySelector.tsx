import { For, createResource, Show, onMount, createSignal } from "solid-js";

type Category = {
  id: number;
  name: string;
  description: string;
  emoji: string;
  color: string;
  _count: { questions: number };
};

async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch("/api/questions/categories");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors du fetch des catégories:", error);
    return [];
  }
}

type CategorySelectorProps = {
  onSelectCategory: (categoryId: number, categoryName: string) => void;
};

const CategorySelector = (props: CategorySelectorProps) => {
  const [isClient, setIsClient] = createSignal(false);

  onMount(() => {
    setIsClient(true);
  });

  const [categories] = createResource(
    () => isClient(),
    () => isClient() ? fetchCategories() : []
  );

  return (
    <div class="space-y-6">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold mb-4 bg-gradient-to-r from-[#FF5F76] to-[#FF914D] bg-clip-text text-transparent">
          Choisis un thème
        </h2>
        <p class="text-gray-600 text-lg">
          Sélectionne une catégorie pour découvrir des questions authentiques
        </p>
      </div>

      <Show when={categories()} fallback={
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map(() => (
            <div class="bg-gray-200 rounded-xl p-6 h-40 animate-pulse"></div>
          ))}
        </div>
      }>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <For each={categories()}>
            {(category) => (
              <button
                class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:scale-105 text-left group"
                style={{ "border-left": `4px solid ${category.color}` }}
                onClick={() => props.onSelectCategory(category.id, category.name)}
              >
                <div class="text-4xl mb-3">{category.emoji}</div>
                <h3 class="font-bold text-xl mb-2 group-hover:text-[#FF5F76] transition-colors" style={{ color: category.color }}>
                  {category.name}
                </h3>
                <p class="text-gray-600 text-sm mb-3 leading-relaxed">{category.description}</p>
                <div class="text-xs text-gray-500 font-medium">
                  {category._count.questions} question{category._count.questions > 1 ? 's' : ''} disponible{category._count.questions > 1 ? 's' : ''}
                </div>
              </button>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default CategorySelector;
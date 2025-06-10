import { createSignal, createEffect, onCleanup } from "solid-js";

type Question = {
  id: number;
  text: string;
  category: {
    id: number;
    name: string;
    emoji: string;
    color: string;
  };
};

type PaginationResponse = {
  questions: Question[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    limit: number;
    answeredCount: number;
  };
};

export function useInfiniteQuestions(categoryId: () => number | null) {
  const [questions, setQuestions] = createSignal<Question[]>([]);
  const [isLoading, setIsLoading] = createSignal(false);
  const [isLoadingMore, setIsLoadingMore] = createSignal(false);
  const [hasNextPage, setHasNextPage] = createSignal(true);
  const [currentPage, setCurrentPage] = createSignal(1);
  const [totalCount, setTotalCount] = createSignal(0);
  const [answeredCount, setAnsweredCount] = createSignal(0);
  const [isInitialized, setIsInitialized] = createSignal(false);

  const fetchQuestions = async (page: number, reset: boolean = false) => {
    // ✅ Éviter les appels simultanés
    if (isLoading() || (isLoadingMore() && !reset)) {
      console.log("🚫 Fetch déjà en cours, annulation...");
      return;
    }

    try {
      if (reset) {
        setIsLoading(true);
        setQuestions([]);
        setCurrentPage(1);
        console.log("🔄 Reset fetch - Category:", categoryId());
      } else {
        setIsLoadingMore(true);
        console.log("📄 Load more - Page:", page);
        // Délai pour "load more" seulement
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      const params = new URLSearchParams({
        page: page.toString(),
        limit: '5'
      });

      if (categoryId() !== null) {
        params.append('categoryId', categoryId()!.toString());
      }

      console.log("🌐 Fetching:", `/api/questions/all?${params}`);
      const response = await fetch(`/api/questions/all?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PaginationResponse = await response.json();
      console.log("📊 Data received:", data);
      
      if (reset) {
        setQuestions(data.questions);
      } else {
        setQuestions(prev => [...prev, ...data.questions]);
      }
      
      setHasNextPage(data.pagination.hasNextPage);
      setCurrentPage(data.pagination.currentPage);
      setTotalCount(data.pagination.totalCount);
      setAnsweredCount(data.pagination.answeredCount || 0);

      if (!isInitialized()) {
        setIsInitialized(true);
      }

    } catch (error) {
      console.error("❌ Erreur lors du fetch des questions:", error);
      if (reset) {
        setQuestions([]);
        setTotalCount(0);
        setAnsweredCount(0);
      }
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!isLoadingMore() && hasNextPage() && isInitialized()) {
      fetchQuestions(currentPage() + 1, false);
    }
  };

  const refreshAfterAnswer = () => {
    console.log("🔄 Manual refresh after answer...");
    // ✅ Refresh manuel avec reset complet
    setIsInitialized(false);
    fetchQuestions(1, true);
  };

  // ✅ NOUVEAU : Effet séparé pour l'initialisation
  createEffect(() => {
    if (!isInitialized()) {
      console.log("🚀 Initial fetch - Category:", categoryId());
      fetchQuestions(1, true);
    }
  });

  // ✅ NOUVEAU : Effet séparé pour le changement de catégorie
  createEffect((prevCategoryId) => {
    const currentCategoryId = categoryId();
    if (isInitialized() && prevCategoryId !== undefined && prevCategoryId !== currentCategoryId) {
      console.log("🏷️ Category changed from", prevCategoryId, "to", currentCategoryId);
      setIsInitialized(false);
      fetchQuestions(1, true);
    }
    return currentCategoryId;
  }, categoryId());

  // Scroll listener
  createEffect(() => {
    const handleScroll = () => {
      if (!isInitialized()) return;
      
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      if (scrollTop + clientHeight >= scrollHeight - 1000 && hasNextPage() && !isLoadingMore()) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    onCleanup(() => window.removeEventListener('scroll', handleScroll));
  });

  return {
    questions,
    isLoading,
    isLoadingMore,
    hasNextPage,
    totalCount,
    answeredCount,
    loadMore,
    refreshAfterAnswer,
    isInitialized // ✅ Exposer pour debug
  };
}
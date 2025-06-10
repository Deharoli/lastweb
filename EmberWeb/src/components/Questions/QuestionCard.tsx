import { createSignal, Show } from "solid-js";

type QuestionCardProps = {
  question: string;
  questionId: number;
  categoryEmoji: string;
  onQuestionAnswered: () => void;
};

const QuestionCard = (props: QuestionCardProps) => {
  const [answer, setAnswer] = createSignal("");
  const [privacy, setPrivacy] = createSignal<"public" | "private">("public");
  const [image, setImage] = createSignal<File | null>(null);
  const [preview, setPreview] = createSignal<string | null>(null);
  const [isPublishing, setIsPublishing] = createSignal(false);
  const [isExpanded, setIsExpanded] = createSignal(false);
  const [isAnswered, setIsAnswered] = createSignal(false);

  const handleImageChange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handlePublish = async (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isPublishing() || isAnswered()) return; // ✅ Double protection
    
    console.log("📝 Publishing answer for question:", props.questionId);
    setIsPublishing(true);

    const formData = new FormData();
    formData.append("title", props.question);
    formData.append("content", answer());
    formData.append("privacy", privacy());
    formData.append("questionId", props.questionId.toString());
    
    if (image()) {
      formData.append("media", image()!);
    }

    try {
      const response = await fetch("/api/posts/create", {
        method: "POST",
        body: formData,
      });
      
      if (response.ok) {
        console.log("✅ Post créé avec succès pour question:", props.questionId);
        
        // ✅ Marquer comme répondu IMMÉDIATEMENT
        setIsAnswered(true);
        setAnswer("");
        setImage(null);
        setPreview(null);
        setIsExpanded(false);
        
        // ✅ Notifier le parent avec un micro-délai
        setTimeout(() => {
          props.onQuestionAnswered();
        }, 100);
        
      } else {
        const errorText = await response.text();
        console.error("❌ Erreur de création:", errorText);
        if (errorText.includes("déjà répondu")) {
          console.log("ℹ️ Question déjà répondue, masquage...");
          setIsAnswered(true);
          setTimeout(() => {
            props.onQuestionAnswered();
          }, 100);
        }
      }
    } catch (error) {
      console.error("❌ Erreur réseau:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  // ✅ Ne pas afficher la question si elle est déjà répondue
  if (isAnswered()) {
    console.log("🚫 Question already answered, hiding:", props.questionId);
    return null;
  }

  return (
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4">
      <div 
        class="flex items-start gap-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded())}
      >
        <div class="text-2xl">{props.categoryEmoji}</div>
        <div class="flex-1">
          <div class="text-gray-900 font-semibold text-lg">{props.question}</div>
          <Show when={!isExpanded()}>
            <div class="text-sm text-gray-500 mt-1">
              Cliquez pour répondre
            </div>
          </Show>
        </div>
        <div class="text-gray-400">
          <i class={`fas fa-chevron-${isExpanded() ? 'up' : 'down'}`}></i>
        </div>
      </div>

      <Show when={isExpanded()}>
        <form onSubmit={handlePublish} class="mt-4 space-y-4">
          <textarea
            class="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#FF5F76] focus:border-transparent text-gray-900 placeholder-gray-500"
            rows={4}
            placeholder="Écris ta réponse..."
            value={answer()}
            onInput={e => setAnswer(e.currentTarget.value)}
            disabled={isPublishing()}
          />
          
          <div class="flex items-center gap-4">
            <label class="cursor-pointer flex items-center gap-2 text-[#FF5F76] hover:underline">
              <i class="fas fa-image"></i>
              <span>Ajouter une image</span>
              <input
                type="file"
                accept="image/*"
                class="hidden"
                onChange={handleImageChange}
                disabled={isPublishing()}
              />
            </label>
            <Show when={preview()}>
              <img src={preview()!} alt="Aperçu" class="h-16 rounded-lg border" />
            </Show>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex gap-2">
              <button
                type="button"
                class={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  privacy() === "public" 
                    ? "bg-gradient-to-r from-[#FF5F76] to-[#FF914D] text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setPrivacy("public")}
                disabled={isPublishing()}
              >
                <i class="fas fa-globe mr-2"></i>Public
              </button>
              <button
                type="button"
                class={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  privacy() === "private" 
                    ? "bg-gradient-to-r from-[#FF5F76] to-[#FF914D] text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setPrivacy("private")}
                disabled={isPublishing()}
              >
                <i class="fas fa-lock mr-2"></i>Privé
              </button>
            </div>
            
            <button
              type="submit"
              class="px-6 py-2 bg-gradient-to-r from-[#FF5F76] to-[#FF914D] text-white rounded-full font-medium transition hover:shadow-lg disabled:opacity-50"
              disabled={!answer().trim() || isPublishing()}
            >
              {isPublishing() ? (
                <>
                  <i class="fas fa-spinner fa-spin mr-2"></i>
                  Publication...
                </>
              ) : (
                <>
                  <i class="fas fa-paper-plane mr-2"></i>
                  Publier
                </>
              )}
            </button>
          </div>
        </form>
      </Show>
    </div>
  );
};

export default QuestionCard;
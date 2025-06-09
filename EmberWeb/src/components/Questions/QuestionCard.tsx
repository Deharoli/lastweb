import { createSignal, Show } from "solid-js";

type QuestionCardProps = {
  question: string;
  isSelected: boolean;
  onSelect: () => void;
  onSubmit: (answer: string, privacy: "public" | "private", image?: File | null) => void;
  onQuestionAnswered: (questionIndex: number) => void; // Nouveau prop
  questionIndex: number; // Nouveau prop
};

const QuestionCard = (props: QuestionCardProps) => {
  const [answer, setAnswer] = createSignal("");
  const [privacy, setPrivacy] = createSignal<"public" | "private">("public");
  const [image, setImage] = createSignal<File | null>(null);
  const [preview, setPreview] = createSignal<string | null>(null);
  const [isPublishing, setIsPublishing] = createSignal(false);

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
    e.stopPropagation();
    setIsPublishing(true);

    console.log("Tentative de publication...");

    const formData = new FormData();
    formData.append("title", props.question);
    formData.append("content", answer());
    formData.append("privacy", privacy());
    
    console.log("FormData:", {
      title: props.question,
      content: answer(),
      privacy: privacy()
    });

    try {
      const response = await fetch("/api/posts/create", {
        method: "POST",
        body: formData,
      });
      
      console.log("Réponse:", response.status, response.statusText);
      
      if (response.ok) {
        console.log("Post créé avec succès");
        props.onQuestionAnswered(props.questionIndex);
      } else {
        const errorText = await response.text();
        console.error("Erreur de création:", errorText);
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div
      class={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-2 cursor-pointer transition hover:shadow-md ${
        props.isSelected ? "border-[#FF5F76]" : ""
      }`}
      onClick={() => !props.isSelected && props.onSelect()}
    >
      <div class="mb-2 text-gray-900 font-semibold text-lg">{props.question}</div>
      <Show when={props.isSelected}>
        <div class="space-y-3">
          <textarea
            class="w-full rounded-lg border border-gray-200 p-3 mb-1 focus:outline-none text-black"
            rows={3}
            placeholder="Ta réponse..."
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
              <img src={preview()!} alt="Aperçu" class="h-16 rounded-lg border ml-2" />
            </Show>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex gap-2">
              <button
                class={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  privacy() === "public"
                    ? "bg-gradient-to-r from-[#FF5F76] to-[#FF914D] text-white border-transparent"
                    : "bg-gray-100 text-gray-700 border-gray-200"
                }`}
                onClick={() => setPrivacy("public")}
                type="button"
                disabled={isPublishing()}
              >
                Public
              </button>
              <button
                class={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  privacy() === "private"
                    ? "bg-gradient-to-r from-[#FF5F76] to-[#FF914D] text-white border-transparent"
                    : "bg-gray-100 text-gray-700 border-gray-200"
                }`}
                onClick={() => setPrivacy("private")}
                type="button"
                disabled={isPublishing()}
              >
                Privé
              </button>
            </div>
            <button
              class="px-6 py-2 bg-gradient-to-r from-[#FF5F76] to-[#FF914D] text-white rounded-full font-semibold shadow hover:from-[#FF5F76] hover:to-[#FF914D] transition disabled:opacity-50"
              onClick={handlePublish}
              disabled={(!answer().trim() && !image()) || isPublishing()}
            >
              {isPublishing() ? "Publication..." : "Publier"}
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default QuestionCard;
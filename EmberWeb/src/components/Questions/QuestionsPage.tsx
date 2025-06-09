import { createSignal } from "solid-js";
import QuestionTabs from "./QuestionTabs";
import QuestionCard from "./QuestionCard";

const questionsList = [
  "Quel est ton meilleur souvenir d'enfance ?",
  "Quelle est la chose qui te rend le plus fier/fière ?",
  "Quel rêve aimerais-tu réaliser ?",
  "Qu'est-ce qui te rend vraiment heureux/heureuse ?",
  "Quel est ton plus grand défi personnel ?",
];

export default function QuestionsPage() {
  const [activeTab, setActiveTab] = createSignal("all");
  const [selectedQuestion, setSelectedQuestion] = createSignal<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = createSignal<Set<number>>(new Set());

  const handleSubmit = (answer: string, privacy: "public" | "private", image?: File | null) => {
    // Cette fonction n'est plus utilisée directement
    setSelectedQuestion(null);
  };

  const handleQuestionAnswered = (questionIndex: number) => {
    // Ajoute la question à la liste des questions répondues
    setAnsweredQuestions(prev => new Set([...prev, questionIndex]));
    setSelectedQuestion(null);
  };

  // Filtre les questions selon l'onglet actif
  const filteredQuestions = () => {
    const answered = answeredQuestions();
    switch (activeTab()) {
      case "answered":
        return questionsList.filter((_, idx) => answered.has(idx));
      case "unanswered":
        return questionsList.filter((_, idx) => !answered.has(idx));
      default:
        return questionsList.filter((_, idx) => !answered.has(idx)); // Par défaut, ne montre que les non-répondues
    }
  };

  return (
    <div class="min-h-screen bg-[#f5f5f7] pt-20">
      <div class="w-full max-w-4xl mx-auto px-4 py-6 pb-24">
        <QuestionTabs activeTab={activeTab()} setActiveTab={setActiveTab} />
        <div class="space-y-4">
          {filteredQuestions().map((q, displayIdx) => {
            const originalIdx = questionsList.indexOf(q);
            return (
              <QuestionCard
                question={q}
                isSelected={selectedQuestion() === originalIdx}
                onSelect={() => setSelectedQuestion(originalIdx)}
                onSubmit={handleSubmit}
                onQuestionAnswered={handleQuestionAnswered}
                questionIndex={originalIdx}
              />
            );
          })}
        </div>
        {filteredQuestions().length === 0 && (
          <div class="text-center py-12 text-gray-500">
            {activeTab() === "answered" ? "Aucune question répondue pour le moment." : "Toutes les questions ont été répondues !"}
          </div>
        )}
      </div>
    </div>
  );
}
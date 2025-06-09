import { cache, createAsync, redirect } from "@solidjs/router";
import Navbar from "../../../components/MenuBar/Navbar";
import BottomBar from "../../../components/MenuBar/BottomBar";
import QuestionsPage from "../../../components/Questions/QuestionsPage";

// Fonction pour vérifier l'authentification
const checkAuth = cache(async () => {
  "use server";
  const { getRequestEvent } = await import("solid-js/web");
  const { getSession } = await import("../../../lib/session");

  const event = getRequestEvent();
  if (!event) throw redirect("/pages/auth");

  const email = await getSession(event.request);

  // ✅ PROTECTION : Redirige vers login si pas de session
  if (!email) {
    throw redirect("/pages/auth");
  }

  return { authenticated: true };
}, "checkAuth");

export default function QuestionRoute() {
  // Vérifie l'authentification avant de rendre la page
  const auth = createAsync(() => checkAuth());

  return (
    <>
      <Navbar />
      <QuestionsPage />
      <BottomBar />
    </>
  );
}
import { createResource, createSignal } from "solid-js";

// Fonction pour obtenir l'email de l'utilisateur depuis la session
async function getSessionEmail() {
  try {
    const response = await fetch("/api/auth/endpoint");
    if (response.ok) {
      const data = await response.json();
      return data.email || null;
    }
    return null;
  } catch (error) {
    console.error("Erreur lors de la récupération de la session:", error);
    return null;
  }
}

// Hook simplifié qui ne fait que récupérer l'email de session
export function useUser() {
  const [user] = createResource(() => getSessionEmail());
  
  return {
    email: user,
    isLoggedIn: () => user() !== null,
  };
}
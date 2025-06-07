import { createResource, createSignal } from "solid-js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fonction pour obtenir l'email de l'utilisateur depuis la session
async function getSessionEmail() {
  try {
    console.log("Tentative de récupération de la session...");
    const response = await fetch("/api/auth/endpoint"); // Essayez d'abord avec l'API de test
    console.log("Réponse reçue:", response.status);
    if (response.ok) {
      const data = await response.json();
      console.log("Données reçues:", data);
      return data.email || null;
    }
    console.log("Réponse non ok:", response.statusText);
    return null;
  } catch (error) {
    console.error("Erreur lors de la récupération de la session:", error);
    return null;
  }
}

// Fonction pour récupérer les données de l'utilisateur depuis la base de données
async function getCurrentUser(email: string | null) {
  if (!email) return null;
  
  try {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return null;
  }
}

// Hook pour utiliser l'utilisateur connecté dans vos composants
export function useUser() {
  const [refresh, setRefresh] = createSignal({});
  
  const [user, { refetch }] = createResource(async () => {
    const email = await getSessionEmail();
    return getCurrentUser(email);
  });
  
  return {
    user,
    // Fonction pour rafraîchir les données de l'utilisateur
    refresh: () => {
      setRefresh({});
      refetch();
    },
    // Fonction pour vérifier si l'utilisateur est connecté
    isLoggedIn: () => user() !== null && user() !== undefined,
  };
}
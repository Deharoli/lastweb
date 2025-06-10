import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Début du seed...');
  console.log('📍 DATABASE_URL:', process.env.DATABASE_URL);
  
  try {
    // Test de connexion
    await prisma.$connect();
    console.log('✅ Connexion à la DB réussie');
    
    // Supprimer les données existantes (optionnel)
    const deletedQuestions = await prisma.question.deleteMany({});
    const deletedCategories = await prisma.questionCategory.deleteMany({});
    
    console.log('🗑️ Questions supprimées:', deletedQuestions.count);
    console.log('🗑️ Catégories supprimées:', deletedCategories.count);

    // Créer les catégories avec vos thèmes (SANS la catégorie IA)
    const categories = await Promise.all([
      prisma.questionCategory.create({
        data: {
          name: "Souvenirs & Nostalgie",
          description: "Questions pour raviver et partager des moments précieux du passé",
          emoji: "🌟",
          color: "#FFD700"
        }
      }),
      prisma.questionCategory.create({
        data: {
          name: "Réflexions Profondes",
          description: "Questions introspectives pour explorer ses pensées et valeurs",
          emoji: "💭",
          color: "#6366F1"
        }
      }),
      prisma.questionCategory.create({
        data: {
          name: "Relations & Connexions",
          description: "Questions sur les liens humains, l'amitié et l'amour",
          emoji: "❤️",
          color: "#EF4444"
        }
      }),
      prisma.questionCategory.create({
        data: {
          name: "Rêves & Aspirations",
          description: "Questions sur les objectifs, ambitions et visions d'avenir",
          emoji: "🎯",
          color: "#F59E0B"
        }
      }),
      prisma.questionCategory.create({
        data: {
          name: "Croissance Personnelle",
          description: "Questions sur l'évolution, les apprentissages et les transformations",
          emoji: "🌱",
          color: "#10B981"
        }
      })
    ]);

    console.log('✅ Catégories créées:', categories.length);

    // Créer 20 questions par catégorie
    const questionsData = [
      // ===== SOUVENIRS & NOSTALGIE (20 questions) =====
      { text: "Quel est ton plus beau souvenir d'enfance ?", categoryId: categories[0].id },
      { text: "Quelle époque de ta vie aimerais-tu revivre ?", categoryId: categories[0].id },
      { text: "Quel moment de ta vie te fait encore sourire aujourd'hui ?", categoryId: categories[0].id },
      { text: "Quelle tradition familiale te tient le plus à cœur ?", categoryId: categories[0].id },
      { text: "Quel objet ancien conserves-tu précieusement et pourquoi ?", categoryId: categories[0].id },
      { text: "Quelle chanson te ramène instantanément dans le passé ?", categoryId: categories[0].id },
      { text: "Quel endroit de ton enfance te manque le plus ?", categoryId: categories[0].id },
      { text: "Quelle habitude de tes grands-parents te fait sourire ?", categoryId: categories[0].id },
      { text: "Quel jeu d'enfance était ton préféré ?", categoryId: categories[0].id },
      { text: "Quelle odeur te rappelle immédiatement ton enfance ?", categoryId: categories[0].id },
      { text: "Quel était ton film ou dessin animé favori quand tu étais petit ?", categoryId: categories[0].id },
      { text: "Quelle fête d'anniversaire as-tu le plus marquée ?", categoryId: categories[0].id },
      { text: "Quel voyage de famille reste gravé dans ta mémoire ?", categoryId: categories[0].id },
      { text: "Quelle photo de toi enfant te fait le plus rire ?", categoryId: categories[0].id },
      { text: "Quel professeur ou instituteur t'a marqué et pourquoi ?", categoryId: categories[0].id },
      { text: "Quelle recette de famille évoque le plus de souvenirs ?", categoryId: categories[0].id },
      { text: "Quel était ton livre d'enfance préféré ?", categoryId: categories[0].id },
      { text: "Quelle bêtise d'enfance te fait encore rire ?", categoryId: categories[0].id },
      { text: "Quel ami d'enfance aimerais-tu retrouver ?", categoryId: categories[0].id },
      { text: "Quelle fête ou célébration de ton passé était magique ?", categoryId: categories[0].id },

      // ===== RÉFLEXIONS PROFONDES (20 questions) =====
      { text: "Quelle est la plus grande leçon que la vie t'ait enseignée ?", categoryId: categories[1].id },
      { text: "Qu'est-ce qui donne vraiment du sens à ta vie ?", categoryId: categories[1].id },
      { text: "Comment définirais-tu le bonheur ?", categoryId: categories[1].id },
      { text: "Quelle vérité sur toi as-tu récemment découverte ?", categoryId: categories[1].id },
      { text: "Quel conseil donnerais-tu à ton moi du passé ?", categoryId: categories[1].id },
      { text: "Qu'est-ce qui te fait te sentir vraiment vivant ?", categoryId: categories[1].id },
      { text: "Quelle peur as-tu réussi à surmonter ?", categoryId: categories[1].id },
      { text: "Comment vois-tu ta place dans le monde ?", categoryId: categories[1].id },
      { text: "Quelle valeur est non-négociable pour toi ?", categoryId: categories[1].id },
      { text: "Qu'est-ce qui te rend unique selon toi ?", categoryId: categories[1].id },
      { text: "Quel moment t'a fait grandir le plus rapidement ?", categoryId: categories[1].id },
      { text: "Comment gères-tu l'incertitude dans ta vie ?", categoryId: categories[1].id },
      { text: "Quelle question existentielle te préoccupe le plus ?", categoryId: categories[1].id },
      { text: "Qu'as-tu appris sur toi cette année ?", categoryId: categories[1].id },
      { text: "Comment définirais-tu la réussite pour toi ?", categoryId: categories[1].id },
      { text: "Quelle croyance as-tu abandonnée en grandissant ?", categoryId: categories[1].id },
      { text: "Qu'est-ce qui te donne de l'espoir dans les moments difficiles ?", categoryId: categories[1].id },
      { text: "Comment veux-tu être remembré ?", categoryId: categories[1].id },
      { text: "Quelle sagesse aimerais-tu transmettre ?", categoryId: categories[1].id },
      { text: "Qu'est-ce qui te fait te sentir en paix ?", categoryId: categories[1].id },

      // ===== RELATIONS & CONNEXIONS (20 questions) =====
      { text: "Qui a eu l'impact le plus positif sur ta vie ?", categoryId: categories[2].id },
      { text: "Qu'est-ce qui rend une amitié précieuse pour toi ?", categoryId: categories[2].id },
      { text: "Quel est le plus beau compliment qu'on t'ait jamais fait ?", categoryId: categories[2].id },
      { text: "Comment exprimes-tu ton amour aux gens qui comptent ?", categoryId: categories[2].id },
      { text: "Quelle qualité admires-tu le plus chez les autres ?", categoryId: categories[2].id },
      { text: "Quel geste d'amour t'a le plus touché ?", categoryId: categories[2].id },
      { text: "Comment sais-tu qu'une personne est vraiment ton ami ?", categoryId: categories[2].id },
      { text: "Quelle conversation a changé ta vision des choses ?", categoryId: categories[2].id },
      { text: "Qui dans ta vie te comprend le mieux ?", categoryId: categories[2].id },
      { text: "Quel sacrifice as-tu fait par amour ?", categoryId: categories[2].id },
      { text: "Qu'est-ce qui te rend fier de tes proches ?", categoryId: categories[2].id },
      { text: "Comment gères-tu les conflits dans tes relations ?", categoryId: categories[2].id },
      { text: "Quelle leçon d'amour as-tu apprise de tes parents ?", categoryId: categories[2].id },
      { text: "Qui t'a aidé à devenir qui tu es aujourd'hui ?", categoryId: categories[2].id },
      { text: "Quel moment partagé avec un proche était parfait ?", categoryId: categories[2].id },
      { text: "Comment montres-tu que tu tiens à quelqu'un ?", categoryId: categories[2].id },
      { text: "Quelle réconciliation t'a fait grandir ?", categoryId: categories[2].id },
      { text: "Qu'est-ce qui te touche le plus chez les gens ?", categoryId: categories[2].id },
      { text: "Quel conseil relationnel donnerais-tu à un jeune ?", categoryId: categories[2].id },
      { text: "Comment crées-tu des liens profonds avec les autres ?", categoryId: categories[2].id },

      // ===== RÊVES & ASPIRATIONS (20 questions) =====
      { text: "Quel rêve aimerais-tu réaliser dans les 5 prochaines années ?", categoryId: categories[3].id },
      { text: "Si tu pouvais changer le monde, par quoi commencerais-tu ?", categoryId: categories[3].id },
      { text: "Quel défi aimerais-tu te lancer cette année ?", categoryId: categories[3].id },
      { text: "Dans quel endroit du monde rêves-tu de vivre ?", categoryId: categories[3].id },
      { text: "Quelle version de toi veux-tu devenir ?", categoryId: categories[3].id },
      { text: "Quel métier aurais-tu aimé exercer dans une autre vie ?", categoryId: categories[3].id },
      { text: "Quelle cause te tient assez à cœur pour te battre ?", categoryId: categories[3].id },
      { text: "Quel projet fou aimerais-tu concrétiser ?", categoryId: categories[3].id },
      { text: "Quelle aventure figure en haut de ta bucket list ?", categoryId: categories[3].id },
      { text: "Quel impact veux-tu laisser sur le monde ?", categoryId: categories[3].id },
      { text: "Quelle compétence rêves-tu de maîtriser parfaitement ?", categoryId: categories[3].id },
      { text: "Quel voyage de rêve planifies-tu depuis longtemps ?", categoryId: categories[3].id },
      { text: "Quelle œuvre (livre, film, art) aimerais-tu créer ?", categoryId: categories[3].id },
      { text: "Quel défi sportif ou physique te tente ?", categoryId: categories[3].id },
      { text: "Quelle tradition aimerais-tu instaurer dans ta famille ?", categoryId: categories[3].id },
      { text: "Quel héritage veux-tu laisser à tes enfants ?", categoryId: categories[3].id },
      { text: "Quelle innovation aimerais-tu voir naître ?", categoryId: categories[3].id },
      { text: "Quel rêve d'enfance aimerais-tu encore réaliser ?", categoryId: categories[3].id },
      { text: "Quelle expérience veux-tu absolument vivre avant tes 50 ans ?", categoryId: categories[3].id },
      { text: "Quel message veux-tu faire passer au monde ?", categoryId: categories[3].id },

      // ===== CROISSANCE PERSONNELLE (20 questions) =====
      { text: "Quelle compétence aimerais-tu développer ?", categoryId: categories[4].id },
      { text: "Quel aspect de ta personnalité as-tu le plus travaillé ?", categoryId: categories[4].id },
      { text: "Comment gères-tu les moments difficiles ?", categoryId: categories[4].id },
      { text: "Quelle habitude as-tu adoptée qui a changé ta vie ?", categoryId: categories[4].id },
      { text: "De quoi es-tu le plus fier dans ton parcours personnel ?", categoryId: categories[4].id },
      { text: "Quel défi personnel t'a le plus fait grandir ?", categoryId: categories[4].id },
      { text: "Comment surmontes-tu tes peurs ?", categoryId: categories[4].id },
      { text: "Quelle zone de confort as-tu récemment quittée ?", categoryId: categories[4].id },
      { text: "Quel échec t'a le plus appris sur toi ?", categoryId: categories[4].id },
      { text: "Comment entretiens-tu ta motivation au quotidien ?", categoryId: categories[4].id },
      { text: "Quelle pratique de bien-être as-tu adoptée ?", categoryId: categories[4].id },
      { text: "Comment développes-tu ta confiance en toi ?", categoryId: categories[4].id },
      { text: "Quel livre ou enseignement t'a transformé ?", categoryId: categories[4].id },
      { text: "Comment gères-tu le stress dans ta vie ?", categoryId: categories[4].id },
      { text: "Quelle routine matinale te met en forme pour la journée ?", categoryId: categories[4].id },
      { text: "Comment cultives-tu ta créativité ?", categoryId: categories[4].id },
      { text: "Quel objectif personnel poursuis-tu actuellement ?", categoryId: categories[4].id },
      { text: "Comment restes-tu connecté à tes valeurs ?", categoryId: categories[4].id },
      { text: "Quelle nouvelle perspective as-tu adoptée récemment ?", categoryId: categories[4].id },
      { text: "Comment célèbres-tu tes petites victoires ?", categoryId: categories[4].id }
    ];

    await Promise.all(
      questionsData.map(q => 
        prisma.question.create({ data: q })
      )
    );

    console.log('✅ Questions créées:', questionsData.length);
    console.log('📊 Répartition:');
    console.log('   - Souvenirs & Nostalgie: 20 questions');
    console.log('   - Réflexions Profondes: 20 questions');
    console.log('   - Relations & Connexions: 20 questions');
    console.log('   - Rêves & Aspirations: 20 questions');
    console.log('   - Croissance Personnelle: 20 questions');
    console.log('🎉 Seed completed successfully!');
  } catch (error) {
    console.error('❌ Erreur dans le seed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Erreur fatale:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Connexion fermée');
  });
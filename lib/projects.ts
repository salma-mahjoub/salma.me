export type ProjectLink = {
  label: string;
  labelFr?: string;
  href: string;
  kind: "live" | "repo" | "ai" | "video";
};

export type Project = {
  id: string;
  name: string;
  kind: "Internship" | "Academic project";
  /** Where it was built, shown next to the kind. */
  context?: string[];
  year?: string;
  summary: string;
  summaryFr: string;
  tags: string[];
  links?: ProjectLink[];
  privateRepo?: boolean;
  note?: string;
  noteFr?: string;
  /** A short badge worth showing off. */
  award?: string;
  /** A quiet animated motif shown at the end of the row. */
  motif?: "secure-sync";
  /** Preview that unfolds on hover, tap or keyboard focus. */
  media?: "browser" | "phone";
};

const gh = (repo: string) => `https://github.com/salma-mahjoub/${repo}`;

export const projects: Project[] = [
  {
    id: "orange",
    name: "Orange Smart Batteries",
    kind: "Internship",
    context: ["Orange Summer Challenge", "Orange Digital Center", "Arcana Soft"],
    year: "2026",
    summary:
      "An intelligent platform that monitors and predicts the health of telecom batteries, so interventions can be anticipated and maintenance optimized. It combines an admin web portal, an offline-first mobile app for field technicians and performance indicators.",
    summaryFr:
      "Plateforme intelligente de gestion et de prédiction de l'état des batteries télécoms, permettant d'anticiper les interventions et d'optimiser la maintenance. Elle combine un portail web d'administration, une application mobile offline-first pour les techniciens et des indicateurs de performance.",
    noteFr: "Réalisé par une équipe pluridisciplinaire : web, backend, mobile et IA.",
    tags: ["Flutter", "Dart", "Angular", "NestJS", "TypeScript", "PostgreSQL", "Drizzle ORM", "Riverpod"],
    note: "Built by a cross-functional team covering web, backend, mobile and AI.",
    privateRepo: true,
  },
  {
    id: "samops",
    name: "SamOps",
    kind: "Academic project",
    context: ["Team project"],
    year: "2026",
    summary:
      "A multi-tenant FinOps web dashboard that centralizes cloud costs, detects anomalies, manages budgets and automates remediation workflows assisted by GitHub and AI.",
    summaryFr:
      "Tableau de bord web FinOps multi-tenant permettant de centraliser les coûts cloud, détecter les anomalies, gérer les budgets et automatiser des workflows de remédiation assistés par GitHub et IA.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Better Auth", "Recharts", "Playwright"],
    links: [{ label: "samops.app", href: "https://samops.app", kind: "live" }],
    privateRepo: true,
    media: "browser",
  },
  {
    id: "walkandwin",
    name: "WalkAndWin",
    kind: "Internship",
    context: ["EKLECTIC"],
    year: "2026",
    summary:
      "A secure Android platform for M2M telemetry synchronization, pairing an autonomous mobile app with a central API. It automates device identification, OAuth 2.0 authentication and background data exchange.",
    summaryFr:
      "Plateforme Android sécurisée de synchronisation de télémétrie M2M, associant une application mobile autonome et une API centrale. Elle automatise l'identification des appareils, l'authentification OAuth 2.0 et les échanges de données en arrière-plan.",
    tags: ["Kotlin", "Jetpack Compose", "WorkManager", "Symfony", "Redis", "OAuth 2.0", "JWT", "Docker"],
    links: [
      { label: "Mobile", href: gh("walkandwin-mobile"), kind: "repo" },
      { label: "API", href: gh("walkandwin-api"), kind: "repo" },
    ],
    motif: "secure-sync",
  },
  {
    id: "styleto",
    name: "Styleto",
    kind: "Academic project",
    year: "2025 – 2026",
    summary:
      "An AI-powered fashion app with automatic clothing detection, personalized outfit recommendations, virtual try-on and a digital wardrobe, plus a real-time marketplace with messaging.",
    summaryFr:
      "Application mobile de mode propulsée par l'IA : détection automatique des vêtements, recommandations de tenues personnalisées, essayage virtuel et garde-robe numérique, avec une marketplace et une messagerie en temps réel.",
    tags: ["SwiftUI", "Kotlin Jetpack Compose", "NestJS", "MongoDB", "Computer Vision", "Hugging Face"],
    links: [
      { label: "iOS", href: "https://github.com/StyletoDAM/Styleto-IOS", kind: "repo" },
      { label: "Android", href: "https://github.com/StyletoDAM/Styleto-Android", kind: "repo" },
      { label: "Backend", href: "https://github.com/StyletoDAM/Styleto-Backend", kind: "repo" },
      { label: "Recommender model", labelFr: "Modèle de recommandation", href: "https://huggingface.co/spaces/Syleto/recommender", kind: "ai" },
      { label: "Clothing detection", labelFr: "Détection de vêtements", href: "https://huggingface.co/spaces/Syleto/labasni-detection", kind: "ai" },
      { label: "Virtual try-on", labelFr: "Essayage virtuel", href: "https://huggingface.co/spaces/Syleto/vto", kind: "ai" },
    ],
    media: "phone",
  },
  {
    id: "wefarm",
    name: "WeFarm",
    kind: "Academic project",
    year: "2024 – 2025",
    summary:
      "A web and desktop platform that connects farmers and agricultural workers. It integrates AI/ML for assisted search, personalized recommendations and face recognition, while centralizing job offers, equipment, land, sales and events.",
    summaryFr:
      "WeFarm est une plateforme web et desktop qui connecte agriculteurs et ouvriers agricoles. Elle intègre des fonctionnalités d'IA/ML pour la recherche assistée, les recommandations personnalisées et la reconnaissance faciale, tout en centralisant les offres, équipements, terrains, ventes et événements.",
    tags: ["Symfony", "PHP", "JavaFX", "MySQL", "Bootstrap", "AI/ML"],
    links: [
      { label: "Web", href: gh("wefarm-web-symfony"), kind: "repo" },
      { label: "Desktop", href: gh("wefarm-desktop-javafx"), kind: "repo" },
      { label: "Watch the promo video", labelFr: "Voir la vidéo promo", href: "https://www.youtube.com/watch?v=jvqXRX8tAQI", kind: "video" },
    ],
    award: "Selected among the best projects at ESPRIT's Bal des Projets",
  },
  {
    id: "recruitment",
    name: "Recruitment Innovation Platform",
    kind: "Academic project",
    year: "2024",
    summary:
      "WorkSwipe is a web recruitment platform to publish, search and manage job offers and applications. It centralizes statistics, exports and document generation to streamline HR follow-up.",
    summaryFr:
      "WorkSwipe est une plateforme web de gestion du recrutement permettant de publier, rechercher et administrer des offres d'emploi ainsi que les candidatures. Elle centralise les statistiques, les exports et la génération de documents pour fluidifier le suivi RH.",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap", "Chart.js", "PHPMailer"],
    privateRepo: true,
  },
  {
    id: "delivery",
    name: "Delivery Operations Desktop App",
    kind: "Academic project",
    year: "2023",
    summary:
      "A desktop application for delivery management that centralizes customers, orders, couriers and suppliers. It adds map-based tracking and alerts connected to an Arduino device to enrich operational monitoring.",
    summaryFr:
      "Application desktop de gestion de livraison centralisant clients, commandes, livreurs et fournisseurs. Elle intègre le suivi cartographique et des alertes connectées à un dispositif Arduino pour enrichir le pilotage opérationnel.",
    tags: ["C++", "Qt", "QML", "Qt SQL", "Arduino", "OpenStreetMap"],
    privateRepo: true,
  },
  {
    id: "quantum",
    name: "Quantum Escape",
    kind: "Academic project",
    context: ["First project"],
    year: "2022 – 2023",
    summary:
      "A futuristic 2D platformer with movement, jumping, enemies, a timer, a minimap and choice-based puzzles.",
    summaryFr:
      "Jeu de plateforme 2D futuriste avec déplacement, saut, ennemi, chronomètre, mini-carte et énigmes à choix.",
    tags: ["C", "SDL", "Makefile"],
    privateRepo: true,
  },
];

// Projects removed from the list for now, kept here so they are easy to bring back.
export const archivedProjects: { name: string; repo?: string }[] = [
  { name: "MindFuel", repo: gh("mindfuel-flutter-app") },
  { name: "ABAP RAP Documentation", repo: gh("documentation-ABAP-RAP") },
  { name: "Healthcare Mobile UI", repo: gh("healthcare-mobile-ui-case-study") },
  { name: "DevOps Practical Labs", repo: gh("devops-practical-labs") },
  { name: "Gestion Foyer API", repo: gh("springboot-si-architecture-labs") },
  { name: "Airport Management", repo: gh("airport-management-dotnet") },
  { name: "Multilingual AI Chatbot" },
];

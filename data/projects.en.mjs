// Tradução para inglês de data/projects.mjs.
// Mesmo slug, só os campos de texto. `images` segue a mesma ordem do arquivo em português.
// Ao cadastrar um projeto novo, adicione a tradução aqui — o build avisa se faltar.

const DEMO_NOTE = 'Demo website: brand, copy and photos are illustrative — not a real client.';

export const projectsEn = {
  blackwash: {
    type: 'Business website',
    summary: 'Premium website for a car wash and detailing studio, with cinematic motion design and booking through WhatsApp.',
    intro:
      'A website template for car wash and auto detailing businesses. The idea is to sell care, not price: large typography, dark photography with light reflections and animations that follow the scroll, always leading the visitor to book on WhatsApp.',
    highlights: [
      'Hero with text reveal and full-screen photography',
      'Services listing what is included, with a per-service quote on WhatsApp',
      'Process, before and after, gallery, testimonials and contact',
      'Ready-made WhatsApp messages by context (general, booking, service)',
      'Reduced motion respected; publishing blocked until real data is filled in',
    ],
    images: [
      { alt: 'BLACKWASH hero: headline "Não é apenas uma lavagem. É outro nível de cuidado." over a photo of a car being washed in a dark garage.', caption: 'Hero — large typography over dark photography.' },
      { alt: 'BLACKWASH services: cards for premium wash, interior cleaning and paint polishing, each with what is included and a quote button.', caption: 'Services — each card opens WhatsApp with the service already written.' },
      { alt: 'BLACKWASH on a phone: headline, supporting copy and booking and services buttons.', caption: 'Mobile version.' },
    ],
    note: DEMO_NOTE,
  },
  'brasa-e-rio': {
    type: 'Business website',
    summary: 'Website for an Amazonian fish restaurant with menu, dining room, reviews, map and ordering through WhatsApp.',
    intro:
      'A website for an Amazonian fish restaurant in Manaus. Warm photography, a menu split between grill and stew dishes, the dining room, what customers say and a map at the end — all designed for people who open it on their phone and decide in seconds where to eat.',
    highlights: [
      'Menu with prices, split into sections (grill, stew, desserts)',
      'Opening hours, delivery and location right at the top',
      'Featured reviews and an embedded map',
      'Orders and reservations through WhatsApp, with a floating button',
      'Mobile-first, with on-page SEO',
    ],
    images: [
      { alt: 'Brasa & Rio hero: headline "Peixe da Amazônia, na brasa." over a photo of grilled fish on a banana leaf.', caption: 'Hero — the dish is the first thing the customer sees.' },
      { alt: 'Brasa & Rio menu: tambaqui ribs, tambaqui steak and roasted matrinxã with prices, next to photos of the dishes.', caption: 'Menu with prices and photos.' },
      { alt: 'Brasa & Rio on a phone: headline, description, order and menu buttons, opening hours and location.', caption: 'Mobile version.' },
    ],
    note: DEMO_NOTE,
  },
  remanso: {
    type: 'Website + catalog',
    summary: 'Furniture store with a filterable catalog, a page per product, clear dimensions and support through WhatsApp.',
    intro:
      'A website template for a contemporary furniture store. It starts from the question that holds back most furniture purchases — "will it fit in my home?" — so dimensions show up everywhere: on the hero photo, in the catalog and on every product page.',
    highlights: [
      'Catalog with search, categories, filters (price, material, tone) and sorting',
      'Filters saved in the URL, so a search can be shared',
      'Product pages with gallery, finishes and a dimension diagram',
      'Inspiration rooms with clickable hotspots on the photo',
      'WhatsApp message prefilled with product name, finish and link',
    ],
    images: [
      { alt: 'Remanso hero: headline "Onde o dia desacelera." next to a photo of a sofa with its 260 cm width drawn over the image.', caption: 'Hero — the sofa’s width drawn on the photo itself.' },
      { alt: 'Remanso catalog: search, category pills, price and material filters on the left and a product grid.', caption: 'Catalog with search, filters and sorting.' },
      { alt: 'Remanso on a phone: headline, description and catalog and consultant buttons.', caption: 'Mobile version.' },
    ],
    note: DEMO_NOTE,
  },
  'sorriso-norte': {
    type: 'Business website',
    summary: 'Dental clinic website: treatments, the first appointment explained, FAQ and booking.',
    intro:
      'A website for a dental clinic. For people who are afraid of the dentist, uncertainty is what weighs most — so the site explains every step before the appointment, presents treatments clearly and keeps booking one tap away.',
    highlights: [
      'Featured treatments, from check-ups to clear aligners',
      'The first appointment explained in three steps',
      'Biosafety, testimonials and frequently asked questions',
      'Embedded map and booking through WhatsApp',
      'Mobile-first, with on-page SEO',
    ],
    images: [
      { alt: 'Sorriso Norte hero: headline "Tratamento sem pressa. Sorriso sem medo." next to a photo of a smiling woman, with "written plan" and "next available slot" tags.', caption: 'Hero — the promise and the next step on the same screen.' },
      { alt: 'Sorriso Norte treatment grid: clear aligners highlighted, cleaning, whitening, implants, root canal and pediatric dentistry.', caption: 'Treatments.' },
      { alt: 'Sorriso Norte on a phone: headline, copy, booking and treatments buttons and clinic benefits.', caption: 'Mobile version.' },
    ],
    note: DEMO_NOTE,
  },
  forja: {
    type: 'Business website',
    summary: 'Gym website with facilities, classes, plans, sign-up steps and conversion through WhatsApp.',
    intro:
      'A website template for a gym. High-contrast visuals, condensed typography and plenty of rhythm, with a direct path to signing up: facilities, classes, plans and a step-by-step on how to get started.',
    highlights: [
      'Facilities by area and a gallery with varied sizes',
      'Classes and plans (with "ask us" when there is no price)',
      'Sign-up steps and frequently asked questions',
      'Ready-made WhatsApp messages by context',
      'Publishing blocked until the content has been reviewed',
    ],
    images: [
      { alt: 'Forja hero: headline "Construa sua melhor versão." in condensed letters over a photo of a woman training with a barbell.', caption: 'Hero — high contrast and condensed typography.' },
      { alt: 'Forja about section: headline "Evoluir todos os dias", four numbered differentiators and training photos.', caption: 'About and differentiators.' },
      { alt: 'Forja on a phone: headline, copy and training and gym buttons.', caption: 'Mobile version.' },
    ],
    note: DEMO_NOTE,
  },
  'vetor-mecanica': {
    type: 'Business website',
    summary: 'Auto repair shop website with services, differentiators, process, FAQ and quotes through WhatsApp.',
    intro:
      'A website template for an auto repair shop. The identity borrows the language of a car dashboard — technical scales, a tachometer, chamfered corners — to convey precision and trust, with every service leading straight to a quote request.',
    highlights: [
      'Eight services, each with its own quote request',
      'About, differentiators, service process and FAQ',
      'Contact with map and opening hours',
      'Validated form that becomes a WhatsApp message',
      'Privacy notice and demo badge',
    ],
    images: [
      { alt: 'Vetor Mecânica hero: headline "Precisão mecânica. Confiança em cada quilômetro." next to a car with its headlights on and a tachometer.', caption: 'Hero — automotive dashboard language.' },
      { alt: 'Vetor Mecânica services: grid with electronic diagnostics, preventive maintenance, brakes, suspension, oil, air conditioning, engine and electrical system.', caption: 'Services with individual quotes.' },
      { alt: 'Vetor Mecânica on a phone: headline, copy and booking and services buttons.', caption: 'Mobile version.' },
    ],
    note: DEMO_NOTE,
  },
  'andrade-menezes': {
    type: 'Business website',
    summary: 'Law firm website: practice areas, how the service works and direct contact.',
    intro:
      'A website for a law firm serving individuals and small businesses. The tone is the opposite of legalese: practice areas described by the client’s problem, the service explained in steps and a clear invitation to a first conversation.',
    highlights: [
      'Five practice areas described by the client’s problem',
      'Service in four steps, from the first conversation to a written proposal',
      'Firm presentation and embedded map',
      'WhatsApp contact throughout the page',
      'Mobile-first, with on-page SEO',
    ],
    images: [
      { alt: 'Andrade & Menezes hero: headline "Direito explicado em português claro." next to a photo of a client meeting.', caption: 'Hero — serif typography and a direct tone.' },
      { alt: 'Andrade & Menezes practice areas: labor, family and estates, consumer, social security and business law, each with examples.', caption: 'Practice areas.' },
      { alt: 'Andrade & Menezes on a phone: headline, copy and conversation and practice areas buttons.', caption: 'Mobile version.' },
    ],
    note: DEMO_NOTE,
  },
  'medatlas-3d': {
    type: 'Web platform · EdTech',
    summary: 'Anatomy study with a navigable 3D model in the browser, AI-generated quizzes and spaced-repetition flashcards.',
    intro:
      'An anatomy study platform: a navigable 3D model in the browser, connected to a database of anatomical structures, with AI-generated quizzes and spaced-repetition flashcards.',
    images: [
      { alt: 'MEDATLAS 3D viewer: skeleton rendered over a grid, with a side panel of 14 toggleable anatomical layers, a toolbar and a minimap.', caption: 'Viewer — 14 anatomical systems as toggleable layers.' },
      { alt: 'MEDATLAS home: headline "Explore o Corpo Humano em 3D", a 3D figure on the right and four indicators — 14 anatomical systems, 3D in the browser, SM-2 spaced repetition and AI tutor.', caption: 'Home — real-time 3D scene in the browser.' },
    ],
    note: 'Live system: you can create an account, search structures and navigate the 3D model.',
    study: {
      problem:
        'Anatomy is spatial content studied from flat material. Printed atlases show fixed sections, and the available 3D tools are usually paid or disconnected from the studying itself: you rotate a bone in one tab, and what you need to memorize is in another.',
      solution:
        'The 3D model and the study material on the same screen. The student selects a structure and gets, right there, its clinical description, anatomical relations, associated pathologies, questions and flashcards — with progress recorded to guide the next session.',
      challenges: [
        { title: 'Separating the 3D scene from application state.', text: 'Mixing the two makes the scene re-render on every menu click. I solved it by isolating state in three Zustand stores by domain, keeping scene components free of application logic.' },
        { title: 'Post-processing without killing the frame rate', text: '— SSAO, Bloom and Vignette applied with layer and clipping-plane control.' },
        { title: 'Content outside the code.', text: 'All anatomical material lives in the database and comes in through seeding, so it can grow without touching the application.' },
      ],
      role: 'The whole project: modeling the 20 entities, 3D integration, API routes, AI question generation and tutor, interface and architecture documentation.',
      result:
        'A working MVP with viewer, search, clinical content, quizzes, flashcards (SM-2 algorithm) and a streaming tutor. The repository was missing its configuration files and wouldn’t install; I rebuilt the manifests and it now passes <code>tsc --noEmit</code> and completes <code>next build</code>. Authentication is on: NextAuth v5 with credentials (bcrypt), JWT sessions and the dashboard protected on the server. What is still pending — email verification and dashboard metrics from the database — is stated in the README instead of being presented as done.',
    },
  },
  toshiba: {
    type: 'Full system · AI',
    summary: 'A local-first system with 19 modules — finances, studies, tasks, workouts and more — operated by conversation.',
    intro:
      'A local-first system I use every day that brings finances, resales, college, studies, tasks, habits, workouts, nutrition and documents together in 19 modules on a single database — and it is operated by conversation.',
    images: [
      { alt: 'TOSHIBA dashboard: a "needs your attention" block with upcoming bills and an exam, and cards for finances, investments, resales, studies and goals.', caption: 'Dashboard — what needs attention today, across modules.' },
      { alt: 'TOSHIBA assistant: the phrases "gastei 27 no almoço" and "estudei 1h de cálculo" become confirmed records, marked "by rule · zero cost", each with an undo button.', caption: 'Assistant — phrases become data by rules, without calling the model.' },
    ],
    note: 'Public copy with the full history (83 commits). The working repository is private: its database holds real personal data.',
    study: {
      problem:
        'My life was scattered across apps that didn’t talk to each other: finances in a spreadsheet, tasks in a notebook, grades on the college portal, workouts and nutrition in separate apps. Recording anything meant opening the right app and filling out a form — the cost of recording was higher than the benefit, so I simply didn’t, and no data ever crossed with any other.',
      solution:
        'A single system operated by conversation: “spent 27 on lunch” becomes a transaction; “studied calculus for 1h” becomes a logged session. Direct phrases are interpreted by a rule-based intent router and become data <em>without any paid AI call</em>; only open questions reach the model. Everything runs on the machine, with a file-based database.',
      challenges: [
        { title: 'Not duplicating business rules.', text: 'The AI has no parallel path: it runs the same domain functions the interface calls, through a hand-written tool registry — written by hand instead of adopting an agent framework, to keep behavior auditable.' },
        { title: 'Transactional propagation.', text: 'Recording the purchase of a product for resale has to create the financial transaction, the inventory item and update the dashboard — all or nothing, in a single transaction.' },
        { title: 'Predictable cost.', text: 'A configurable monthly spending cap; when it is reached, the system degrades to rules mode instead of stopping.' },
      ],
      role: 'The whole project, on my own: architecture decisions and the reasoning behind each one, database modeling, the AI layer, domain rules, interface, tests and technical documentation (architecture, data schema and roadmap).',
      result:
        'MVP finished and in daily use: <strong>54 models in the schema</strong>, <strong>58 test files</strong> (unit and integration with a disposable database) and <strong>87 commits</strong>. It works offline and, with a local model, at zero AI cost.',
    },
  },
  'pulso-verde': {
    type: 'Interactive map · Open data',
    summary: 'Interactive map of fires and deforestation in the Amazon, with data from NASA FIRMS and INPE.',
    intro:
      'An interactive map of fires and deforestation in the Amazon. It consumes the <strong>NASA FIRMS</strong> API (CSV with a custom parser) and the <strong>TerraBrasilis/INPE</strong> WFS with a <code>CQL</code> filter by period. Every call has a timeout with <code>AbortController</code> and an error message translated for the interface.',
    images: [
      { alt: 'Pulso Verde map over the Legal Amazon: polygons of conservation units and Indigenous lands, rivers, DETER deforestation alerts and a side panel with API status and a period summary.', caption: 'Map with layers and the status of each data source.' },
    ],
  },
  'body-os': {
    type: 'Web app · Offline-first',
    summary: 'Body composition and performance for an athlete, with offline records that sync without duplicates.',
    intro:
      'A body composition and performance system for an athlete: weight, nutrition, workouts, recovery and competition in one place, with a weekly report. Records work <strong>offline</strong> in IndexedDB and sync without duplicates. A database with 22 tables by domain and photos in private storage. <em>With no AI provider configured, the interface declares basic mode and answers by rules.</em>',
    images: [
      { alt: 'BODY OS overview: current weight, 7-day average, body progress chart and daily macronutrient targets.', caption: 'Overview.' },
      { alt: 'BODY OS assistant showing the notice "Basic mode · rules with your records" and suggestions based on the day’s data.', caption: 'Assistant in basic, rule-based mode.' },
    ],
  },
};

// Diagramas de arquitetura traduzidos (mesma estrutura dos originais).
const architecture = {
  'medatlas-3d': `Browser — Next.js 15 (App Router) + React 19
   │
   ├─ Three.js / React Three Fiber ──→ .glb model + SSAO, Bloom and Vignette
   ├─ Zustand ──→ state isolated by domain: viewer · quiz · study
   │
   ↓  API routes
   ├─ /api/structures/[id]   structure, relations and pathologies
   ├─ /api/search            search by anatomical system
   ├─ /api/ai/chat   (Edge)  ──→ OpenAI, streamed response
   └─ /api/ai/quiz           ──→ OpenAI, question generation
   ↓
Prisma ORM ──→ PostgreSQL  (20 models: structures, quiz, progress, conversations)`,
  toshiba: `Text input
     │
     ├─→ Intent router (rules)  ──→ domain function ──→ database   [zero cost]
     │
     └─→ AIProvider layer  ──→  Ollama (local) | Claude | OpenAI | Gemini
              │                        │
              │                        └─→ monthly budget with automatic cutoff
              │                            (when exceeded, falls back to rules mode)
              ↓
        Tool Registry  ──→  the SAME domain functions the interface uses
              ↓
        Server Actions (Next.js) ──→ Prisma 7 ──→ SQLite (WAL, local)`,
};
for (const [slug, text] of Object.entries(architecture)) projectsEn[slug].study.architecture = text;

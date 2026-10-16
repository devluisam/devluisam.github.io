// ─────────────────────────────────────────────────────────────────────────────
// DADOS DOS PROJETOS — a única fonte que você precisa editar para cadastrar
// um trabalho novo. Depois de editar: `npm run build` (gera a galeria da home,
// as páginas em /projetos/<slug>/ e o sitemap).
//
// Como cadastrar um projeto:
//  1. Coloque as capturas em assets-src/projetos/<slug>/ (PNG/JPG). O prefixo
//     numérico define a ordem; a primeira imagem é a capa do card.
//  2. Rode `npm run images` (gera os .webp em img/projetos/<slug>/).
//  3. Adicione um objeto em `projects` abaixo e rode `npm run build`.
//
// Ordem de exibição: primeiro os que têm `featured: true`, depois os demais —
// sempre na ordem deste array. Mantenha os mais recentes no topo de cada grupo.
// Não há datas inventadas: a ordem é a única informação de recência.
//
// Campos:
//  slug        identificador e endereço da página (/projetos/<slug>/)
//  name        nome do projeto
//  category    id de uma das `categories`
//  type        tipo de entrega (aparece como etiqueta)
//  model       true para sites-modelo de demonstração (marca e conteúdo fictícios)
//  status      'live' (no ar) | 'demo' (modelo não publicado) | 'repo' (código aberto) | 'private'
//  summary     frase curta do card (até ~150 caracteres)
//  intro       parágrafo de abertura da página do projeto
//  highlights  o que o projeto entrega (lista curta)
//  stack       tecnologias usadas (só as confirmadas)
//  images      [{ file, alt, caption?, device? }] — `file` sem extensão; device: 'mobile'
//  links       { live?, repo? }
//  note        observação honesta (ex.: conteúdo fictício, repositório privado)
//  study       estudo de caso opcional: { problem, solution, architecture, challenges[], role, result }
// ─────────────────────────────────────────────────────────────────────────────

export const categories = [
  { id: 'restaurantes', label: 'Restaurantes' },
  { id: 'lava-jatos', label: 'Lava-jatos' },
  { id: 'lojas', label: 'Lojas' },
  { id: 'clinicas', label: 'Clínicas' },
  { id: 'beleza', label: 'Beleza' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'academias', label: 'Academias' },
  { id: 'sistemas', label: 'Sistemas & IA' },
  { id: 'outros', label: 'Outros' },
];

const DEMO_NOTE = 'Modelo de demonstração: marca, textos e fotos são ilustrativos — não é um cliente real.';

export const projects = [
  // ── Sites ──────────────────────────────────────────────────────────────────
  {
    slug: 'blackwash',
    name: 'BLACKWASH',
    category: 'lava-jatos',
    type: 'Site institucional',
    model: true,
    status: 'demo',
    featured: true,
    summary: 'Site premium para lava-jato e estética automotiva, com motion design cinematográfico e agendamento pelo WhatsApp.',
    intro:
      'Modelo de site para lava-jato e detalhamento automotivo. A proposta é vender cuidado, não preço: tipografia grande, fotografia escura com reflexos de luz e animações que acompanham a rolagem, sempre levando o visitante ao agendamento pelo WhatsApp.',
    highlights: [
      'Hero com revelação de texto e fotografia em tela cheia',
      'Serviços com o que está incluso e orçamento por serviço no WhatsApp',
      'Processo, antes e depois, galeria, depoimentos e contato',
      'Mensagens do WhatsApp prontas por contexto (geral, agendamento, serviço)',
      'Movimento reduzido respeitado; bloqueio de publicação sem dados reais',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'GSAP + ScrollTrigger', 'Lenis', 'Motion'],
    images: [
      { file: '1-capa', alt: 'Hero do BLACKWASH: título "Não é apenas uma lavagem. É outro nível de cuidado." sobre a foto de um carro sendo lavado em um galpão escuro.', caption: 'Hero — tipografia grande sobre fotografia escura.' },
      { file: '2-servicos', alt: 'Seção de serviços do BLACKWASH: cards de lavagem premium, higienização interna e polimento técnico, cada um com itens inclusos e botão de orçamento.', caption: 'Serviços — cada card abre o WhatsApp com o serviço já escrito.' },
      { file: '3-mobile', alt: 'BLACKWASH no celular: título, texto de apoio e botões de agendamento e serviços.', caption: 'Versão mobile.', device: 'mobile' },
    ],
    links: { live: 'https://blackwash-lavajato.vercel.app' },
    note: DEMO_NOTE,
  },
  {
    slug: 'brasa-e-rio',
    name: 'Brasa & Rio',
    category: 'restaurantes',
    type: 'Site institucional',
    model: true,
    status: 'live',
    featured: true,
    summary: 'Site de peixaria amazônica com cardápio, ambiente, avaliações, mapa e pedido direto pelo WhatsApp.',
    intro:
      'Site para uma peixaria amazônica em Manaus. Fotografia quente, cardápio dividido entre brasa e panela, o salão, o que os clientes dizem e um mapa no fim — tudo pensado para quem abre pelo celular e decide em segundos onde vai comer.',
    highlights: [
      'Cardápio com preços, separado por seção (da brasa, da panela, pra fechar)',
      'Horário, delivery e localização logo no topo',
      'Avaliações em destaque e mapa incorporado',
      'Pedido e reserva pelo WhatsApp, com botão flutuante',
      'Feito primeiro para o celular, com SEO on-page',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Mobile first', 'SEO'],
    images: [
      { file: '1-capa', alt: 'Hero do Brasa & Rio: título "Peixe da Amazônia, na brasa." sobre foto de peixe assado na folha de bananeira.', caption: 'Hero — o prato é a primeira coisa que o cliente vê.' },
      { file: '2-cardapio', alt: 'Cardápio do Brasa & Rio: banda de tambaqui, costela de tambaqui e matrinxã assado com preços, ao lado de fotos dos pratos.', caption: 'Cardápio com preços e fotos.' },
      { file: '3-mobile', alt: 'Brasa & Rio no celular: título, descrição, botões de pedido e cardápio, horário e localização.', caption: 'Versão mobile.', device: 'mobile' },
    ],
    links: { live: 'https://devluisam.github.io/sites/modelos/restaurante/' },
    note: DEMO_NOTE,
  },
  {
    slug: 'remanso',
    name: 'Remanso',
    category: 'lojas',
    type: 'Site + catálogo',
    model: true,
    status: 'demo',
    featured: true,
    summary: 'Loja de móveis com catálogo filtrável, página por produto, medidas claras e atendimento pelo WhatsApp.',
    intro:
      'Modelo de site para loja de móveis contemporâneos. O ponto de partida foi a dúvida que mais trava a compra de um móvel — "cabe na minha casa?" — por isso as medidas aparecem em todo lugar: na foto do hero, no catálogo e em cada página de produto.',
    highlights: [
      'Catálogo com busca, categorias, filtros (preço, material, tom) e ordenação',
      'Filtros salvos na URL, para compartilhar uma busca',
      'Página por produto com galeria, acabamentos e esquema de medidas',
      'Ambientes de inspiração com pontos clicáveis sobre a foto',
      'WhatsApp com nome do produto, acabamento e link já preenchidos',
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'Motion', 'Pré-renderização (SSR)'],
    images: [
      { file: '1-capa', alt: 'Hero do Remanso: título "Onde o dia desacelera." ao lado da foto de um sofá com a cota de 260 cm desenhada sobre a imagem.', caption: 'Hero — a medida do sofá desenhada na própria foto.' },
      { file: '2-catalogo', alt: 'Catálogo do Remanso: busca, categorias em pílulas, filtros de preço e material à esquerda e grade de produtos.', caption: 'Catálogo com busca, filtros e ordenação.' },
      { file: '3-mobile', alt: 'Remanso no celular: título, descrição e botões de catálogo e consultor.', caption: 'Versão mobile.', device: 'mobile' },
    ],
    links: { live: 'https://remanso-moveis.vercel.app' },
    note: DEMO_NOTE,
  },
  {
    slug: 'sorriso-norte',
    name: 'Sorriso Norte',
    category: 'clinicas',
    type: 'Site institucional',
    model: true,
    status: 'live',
    featured: true,
    summary: 'Site de clínica odontológica: tratamentos, primeira consulta explicada, perguntas frequentes e agendamento.',
    intro:
      'Site para uma clínica odontológica. Para quem tem medo de dentista, o que pesa é a incerteza; por isso o site explica cada etapa antes da consulta, mostra os tratamentos com clareza e deixa o agendamento a um toque.',
    highlights: [
      'Tratamentos em destaque, do check-up ao alinhador invisível',
      'Primeira consulta explicada em três etapas',
      'Biossegurança, depoimentos e perguntas frequentes',
      'Mapa incorporado e agendamento pelo WhatsApp',
      'Feito primeiro para o celular, com SEO on-page',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Mobile first', 'SEO'],
    images: [
      { file: '1-capa', alt: 'Hero da Sorriso Norte: título "Tratamento sem pressa. Sorriso sem medo." ao lado da foto de uma mulher sorrindo, com etiquetas "Plano por escrito" e "Próximo horário livre".', caption: 'Hero — a promessa e o próximo passo na mesma tela.' },
      { file: '2-tratamentos', alt: 'Grade de tratamentos da Sorriso Norte: alinhadores invisíveis em destaque, limpeza, clareamento, implantes, canal e odontopediatria.', caption: 'Tratamentos.' },
      { file: '3-mobile', alt: 'Sorriso Norte no celular: título, texto, botões de agendamento e tratamentos e vantagens da clínica.', caption: 'Versão mobile.', device: 'mobile' },
    ],
    links: { live: 'https://devluisam.github.io/sites/modelos/clinica/' },
    note: DEMO_NOTE,
  },
  {
    slug: 'forja',
    name: 'Forja',
    category: 'academias',
    type: 'Site institucional',
    model: true,
    status: 'demo',
    featured: false,
    summary: 'Site de academia com estrutura, modalidades, planos, etapas de matrícula e conversão pelo WhatsApp.',
    intro:
      'Modelo de site para academia. Visual de alto contraste, tipografia condensada e muito ritmo, com um caminho direto para a matrícula: estrutura, modalidades, planos e um passo a passo de como começar.',
    highlights: [
      'Estrutura por áreas e galeria com tamanhos variados',
      'Modalidades e planos (com "consulte" quando não há preço)',
      'Etapas de matrícula e perguntas frequentes',
      'Mensagens do WhatsApp prontas por contexto',
      'Bloqueio de publicação enquanto o conteúdo não for revisado',
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'Motion', 'Pré-renderização (SSR)'],
    images: [
      { file: '1-capa', alt: 'Hero da Forja: título "Construa sua melhor versão." em letras condensadas sobre a foto de uma mulher treinando com barra.', caption: 'Hero — alto contraste e tipografia condensada.' },
      { file: '2-sobre', alt: 'Seção sobre da Forja: título "Evoluir todos os dias", quatro diferenciais numerados e fotos de treino.', caption: 'Sobre e diferenciais.' },
      { file: '3-mobile', alt: 'Forja no celular: título, texto e botões de treino e da academia.', caption: 'Versão mobile.', device: 'mobile' },
    ],
    links: { live: 'https://forja-academia-theta.vercel.app' },
    note: DEMO_NOTE,
  },
  {
    slug: 'vetor-mecanica',
    name: 'Vetor Mecânica',
    category: 'servicos',
    type: 'Site institucional',
    model: true,
    status: 'demo',
    featured: false,
    summary: 'Site de oficina mecânica com serviços, diferenciais, processo, perguntas frequentes e orçamento pelo WhatsApp.',
    intro:
      'Modelo de site para oficina mecânica. A identidade usa a linguagem do painel do carro — escala técnica, conta-giros, cantos chanfrados — para passar precisão e confiança, com cada serviço levando direto a um pedido de orçamento.',
    highlights: [
      'Oito serviços com pedido de orçamento individual',
      'Sobre, diferenciais, processo de atendimento e FAQ',
      'Contato com mapa e horários',
      'Formulário validado que vira mensagem de WhatsApp',
      'Aviso de privacidade e selo de demonstração',
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'Motion', 'Pré-renderização (SSR)'],
    images: [
      { file: '1-capa', alt: 'Hero da Vetor Mecânica: título "Precisão mecânica. Confiança em cada quilômetro." ao lado de um carro com faróis acesos e um conta-giros.', caption: 'Hero — linguagem de painel automotivo.' },
      { file: '2-servicos', alt: 'Serviços da Vetor Mecânica: grade com diagnóstico eletrônico, revisão preventiva, freios, suspensão, óleo, ar-condicionado, motor e sistema elétrico.', caption: 'Serviços com orçamento individual.' },
      { file: '3-mobile', alt: 'Vetor Mecânica no celular: título, texto e botões de agendamento e serviços.', caption: 'Versão mobile.', device: 'mobile' },
    ],
    links: { live: 'https://vetor-mecanica-oficina.vercel.app' },
    note: DEMO_NOTE,
  },
  {
    slug: 'andrade-menezes',
    name: 'Andrade & Menezes',
    category: 'servicos',
    type: 'Site institucional',
    model: true,
    status: 'live',
    featured: false,
    summary: 'Site de escritório de advocacia: áreas de atuação, como funciona o atendimento e contato direto.',
    intro:
      'Site para um escritório de advocacia que atende pessoas e pequenas empresas. O tom é o oposto do juridiquês: áreas de atuação descritas pelo problema do cliente, o atendimento explicado em etapas e um convite claro para a primeira conversa.',
    highlights: [
      'Cinco áreas de atuação descritas pelo problema do cliente',
      'Atendimento em quatro etapas, da conversa à proposta por escrito',
      'Apresentação do escritório e mapa incorporado',
      'Contato pelo WhatsApp em toda a página',
      'Feito primeiro para o celular, com SEO on-page',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Mobile first', 'SEO'],
    images: [
      { file: '1-capa', alt: 'Hero do Andrade & Menezes: título "Direito explicado em português claro." ao lado da foto de uma reunião com cliente.', caption: 'Hero — tipografia serifada e tom direto.' },
      { file: '2-areas', alt: 'Áreas de atuação do Andrade & Menezes: trabalhista, família e sucessões, consumidor, previdenciário e empresarial, cada uma com exemplos.', caption: 'Áreas de atuação.' },
      { file: '3-mobile', alt: 'Andrade & Menezes no celular: título, texto e botões de conversa e áreas de atuação.', caption: 'Versão mobile.', device: 'mobile' },
    ],
    links: { live: 'https://devluisam.github.io/sites/modelos/advocacia/' },
    note: DEMO_NOTE,
  },

  // ── Sistemas ───────────────────────────────────────────────────────────────
  {
    slug: 'medatlas-3d',
    name: 'MEDATLAS 3D',
    category: 'sistemas',
    type: 'Plataforma web · EdTech',
    status: 'live',
    featured: false,
    summary: 'Estudo de anatomia com modelo 3D navegável no navegador, quiz gerado por IA e flashcards com repetição espaçada.',
    intro:
      'Plataforma de estudo de anatomia: um modelo 3D navegável no navegador, ligado ao banco de estruturas anatômicas, com quiz gerado por IA e flashcards com repetição espaçada.',
    stack: ['Next.js 15', 'React 19', 'Three.js', 'React Three Fiber', 'Zustand', 'Prisma', 'PostgreSQL', 'NextAuth', 'OpenAI API', 'Tailwind'],
    images: [
      { file: '1-visualizador', alt: 'Visualizador 3D do MEDATLAS: esqueleto renderizado sobre uma grade, com painel lateral de 14 camadas anatômicas ligáveis, barra de ferramentas e minimapa.', caption: 'Visualizador — 14 sistemas anatômicos como camadas ligáveis.' },
      { file: '2-home', alt: 'Home do MEDATLAS: título "Explore o Corpo Humano em 3D", figura 3D à direita e quatro indicadores — 14 sistemas anatômicos, 3D no navegador, repetição espaçada SM-2 e tutor de IA.', caption: 'Home — cena 3D em tempo real no navegador.' },
    ],
    links: { live: 'https://medatlas-3d.vercel.app', repo: 'https://github.com/devluisam/medatlas-3d' },
    note: 'Sistema no ar: dá para criar conta, buscar estruturas e navegar no modelo 3D.',
    study: {
      problem:
        'Anatomia é um conteúdo espacial estudado em material plano. Atlas impressos mostram cortes fixos, e as ferramentas 3D disponíveis costumam ser pagas ou desconectadas do estudo em si: você gira um osso numa aba, e o que precisa memorizar está em outra.',
      solution:
        'Modelo 3D e material de estudo na mesma tela. O estudante seleciona uma estrutura e recebe ali a descrição clínica, as relações anatômicas, as patologias associadas, as questões e os flashcards daquela estrutura — com o progresso registrado para orientar a próxima sessão.',
      architecture: `Navegador — Next.js 15 (App Router) + React 19
   │
   ├─ Three.js / React Three Fiber ──→ modelo .glb + SSAO, Bloom e Vignette
   ├─ Zustand ──→ estado isolado por domínio: viewer · quiz · study
   │
   ↓  rotas de API
   ├─ /api/structures/[id]   estrutura, relações e patologias
   ├─ /api/search            busca por sistema anatômico
   ├─ /api/ai/chat   (Edge)  ──→ OpenAI, resposta em streaming
   └─ /api/ai/quiz           ──→ OpenAI, geração de questões
   ↓
Prisma ORM ──→ PostgreSQL  (20 modelos: estruturas, quiz, progresso, conversas)`,
      challenges: [
        { title: 'Separar cena 3D de estado de aplicação.', text: 'Misturar as duas coisas faz a cena re-renderizar a cada clique de menu. Resolvi isolando o estado em três stores Zustand por domínio, deixando os componentes de cena sem lógica de aplicação.' },
        { title: 'Pós-processamento sem derrubar o frame rate', text: '— SSAO, Bloom e Vignette aplicados com controle de camadas e de plano de corte.' },
        { title: 'Conteúdo fora do código.', text: 'Todo o material anatômico vive no banco e entra por seed, para poder crescer sem tocar na aplicação.' },
      ],
      role: 'Projeto inteiro: modelagem das 20 entidades, integração 3D, rotas de API, geração de questões e tutor por IA, interface e documentação de arquitetura.',
      result:
        'MVP funcional com visualizador, busca, conteúdo clínico, quiz, flashcards (algoritmo SM-2) e tutor em streaming. O repositório estava sem os arquivos de configuração e não instalava; reconstruí os manifestos e hoje ele passa em <code>tsc --noEmit</code> e conclui o <code>next build</code>. A autenticação está ligada: NextAuth v5 com credenciais (bcrypt), sessão em JWT e o painel protegido no servidor. O que segue pendente — verificação de email e as métricas do painel vindas do banco — está declarado no README em vez de ser apresentado como pronto.',
    },
  },
  {
    slug: 'toshiba',
    name: 'TOSHIBA — Personal Life OS',
    category: 'sistemas',
    type: 'Sistema completo · IA',
    status: 'repo',
    featured: false,
    summary: 'Sistema local-first com 19 módulos — finanças, estudos, tarefas, treino e mais — operado por conversa.',
    intro:
      'Sistema local-first de uso diário que centraliza finanças, revendas, faculdade, estudos, tarefas, hábitos, treino, alimentação e documentos em 19 módulos sobre um único banco — e é operado por conversa.',
    stack: ['Next.js 16', 'React 19', 'TypeScript strict', 'Prisma 7', 'SQLite', 'Tailwind v4', 'shadcn/ui', 'Zod 4', 'Vitest', 'PWA'],
    images: [
      { file: '1-dashboard', alt: 'Dashboard do TOSHIBA: bloco "Precisa da sua atenção" com contas a vencer e prova próxima, e cartões de finanças, investimentos, revendas, estudos e metas.', caption: 'Dashboard — o que precisa de atenção hoje, cruzando os módulos.' },
      { file: '2-assistente', alt: 'Assistente do TOSHIBA: as frases "gastei 27 no almoço" e "estudei 1h de cálculo" viram registros confirmados, marcados como "por regra · custo zero", cada um com botão desfazer.', caption: 'Assistente — frases viram dados por regra, sem chamar o modelo.' },
    ],
    links: { repo: 'https://github.com/devluisam/toshiba-life-os' },
    note: 'Cópia pública com o histórico completo (83 commits). O repositório de trabalho é privado: o banco guarda dados pessoais reais.',
    study: {
      problem:
        'Minha vida estava espalhada por aplicativos que não se conversavam: finanças numa planilha, tarefas num caderno, notas da faculdade no portal, treino e alimentação em apps separados. Registrar qualquer coisa exigia abrir o app certo e preencher formulário — o custo de registrar era maior que o benefício, então eu simplesmente não registrava, e nenhum dado se cruzava com outro.',
      solution:
        'Um sistema único operado por conversa: “gastei 27 no almoço” vira uma transação; “estudei 1h de cálculo” vira uma sessão registrada. Frases diretas são interpretadas por um roteador de intenção baseado em regras e viram dados <em>sem nenhuma chamada paga de IA</em>; só perguntas abertas acionam o modelo. Tudo roda na máquina, com o banco em arquivo.',
      architecture: `Entrada de texto
     │
     ├─→ Roteador de intenção (regras)  ──→ função de domínio ──→ banco     [custo zero]
     │
     └─→ Camada AIProvider  ──→  Ollama (local) | Claude | OpenAI | Gemini
              │                        │
              │                        └─→ orçamento mensal com corte automático
              │                            (ao estourar, volta para o modo regras)
              ↓
        Tool Registry  ──→  as MESMAS funções de domínio que a interface usa
              ↓
        Server Actions (Next.js) ──→ Prisma 7 ──→ SQLite (WAL, local)`,
      challenges: [
        { title: 'Não duplicar regra de negócio.', text: 'A IA não tem um caminho paralelo: ela executa as mesmas funções de domínio que a interface chama, através de um registro de ferramentas próprio — escrito à mão em vez de adotar um framework de agentes, para manter o comportamento auditável.' },
        { title: 'Propagação transacional.', text: 'Registrar a compra de um produto para revenda precisa criar a transação financeira, o item de estoque e atualizar o painel — tudo ou nada, numa transação só.' },
        { title: 'Custo previsível.', text: 'Teto de gasto mensal configurável; ao atingir o limite, o sistema degrada para o modo regras em vez de parar de funcionar.' },
      ],
      role: 'Projeto inteiro, sozinho: decisões de arquitetura e a justificativa de cada uma, modelagem do banco, camada de IA, regras de domínio, interface, testes e a documentação técnica (arquitetura, esquema de dados e roadmap).',
      result:
        'MVP concluído e em uso diário: <strong>54 modelos no schema</strong>, <strong>58 arquivos de teste</strong> (unitários e de integração com banco descartável) e <strong>87 commits</strong>. Funciona offline e, com modelo local, sem custo de IA.',
    },
  },
  {
    slug: 'pulso-verde',
    name: 'Pulso Verde',
    category: 'sistemas',
    type: 'Mapa interativo · Dados abertos',
    status: 'repo',
    featured: false,
    summary: 'Mapa interativo de queimadas e desmatamento na Amazônia com dados da NASA FIRMS e do INPE.',
    intro:
      'Mapa interativo de queimadas e desmatamento na Amazônia. Consome a API da <strong>NASA FIRMS</strong> (CSV com parser próprio) e o WFS do <strong>TerraBrasilis/INPE</strong> com filtro <code>CQL</code> por período. Cada chamada tem timeout com <code>AbortController</code> e erro traduzido para a interface.',
    stack: ['React', 'Leaflet', 'Recharts', 'Dados abertos'],
    images: [
      { file: '1-mapa', alt: 'Mapa do Pulso Verde sobre a Amazônia Legal: polígonos de unidades de conservação e terras indígenas, rios, alertas de desmatamento do DETER e painel lateral com o estado das APIs e o resumo do período.', caption: 'Mapa com camadas e o estado de cada fonte de dados.' },
    ],
    links: { repo: 'https://github.com/devluisam/pulso-verde' },
  },
  {
    slug: 'body-os',
    name: 'BODY OS',
    category: 'sistemas',
    type: 'Aplicação web · Offline-first',
    status: 'repo',
    featured: false,
    summary: 'Composição corporal e performance para atleta, com registros offline que sincronizam sem duplicar.',
    intro:
      'Sistema de composição corporal e performance para atleta: peso, alimentação, treinos, recuperação e campeonato num só lugar, com relatório semanal. Registros funcionam <strong>offline</strong> em IndexedDB e sincronizam sem duplicar. Banco com 22 tabelas por domínio e fotos em armazenamento privado. <em>Sem provedor de IA configurado, a interface declara modo básico e responde por regras.</em>',
    stack: ['React 19', 'TypeScript', 'Cloudflare Workers', 'D1 / SQLite', 'Drizzle', 'Zod'],
    images: [
      { file: '1-visao', alt: 'Visão geral do BODY OS: peso atual, média de 7 dias, gráfico de evolução corporal e metas de macronutrientes do dia.', caption: 'Visão geral.' },
      { file: '2-assistente', alt: 'Assistente do BODY OS exibindo o aviso "Modo básico · regras com seus registros" e sugestões a partir dos dados do dia.', caption: 'Assistente em modo básico, por regras.' },
    ],
    links: { repo: 'https://github.com/devluisam/body-os' },
  },
];

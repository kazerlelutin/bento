import type { AboutContentItem } from "./about.types";

export const ABOUT_CONTAINER_ID = 'about-container';
export const ABOUT_ITEMS_CONTAINER_ID = 'about-items-container';

export const ABOUT_ITEM_TEMPLATE_ID = 'about-item-template';

export const aboutTitle = {
  fr: 'À propos',
  en: 'About',
  ko: '약간',
  ch: '关于'
};

export const aboutContent: AboutContentItem[] = [
  {
    title: {
      fr: 'Qui suis-je ?',
      en: 'Who am I?',
      ko: '나는 누구인가?',
      ch: '我是谁？'
    },
    content: {
      fr: 'Je suis Benoist Bouteiller, créateur de jeux et développeur d\'applications. Passionné par les cuisines coréenne, japonaise et chinoise, j\'ai créé BENTO pour vous aider à trouver des recettes quand vous n\'avez pas d\'idée, avec une interface simple — centrée sur le repas à emporter et les infos utiles (transport, conservation, façon de manger…).',
      en: 'I am Benoist Bouteiller, game creator and app developer. I love Korean, Japanese and Chinese cooking, and I built BENTO to help you find recipe ideas when you are stuck — with a simple interface focused on packed lunches and practical details (transport, storage, how to eat…).',
      ko: '저는 게임 제작자이자 앱 개발자 Benoist Bouteiller입니다. 한국·일본·중국 요리를 사랑하며, 아이디어가 없을 때 도시락과 실용 정보(운반·보관·먹는 방식 등)에 초점을 맞춘 BENTO를 만들었습니다.',
      ch: '我是 Benoist Bouteiller，游戏与应用开发者。我热爱韩餐、日餐与中餐，并做了 BENTO，帮你在没灵感时找食谱——界面简洁，侧重外带餐与实用信息（携带、保存、食用方式等）。'
    },
    link: "http://bouteiller.contact/",
    linkText: {
      fr: 'Me contacter',
      en: 'Contact me',
      ko: '연락하기',
      ch: '联系我'
    }
  },
  {
    title: {
      fr: 'Concept BENTO',
      en: 'BENTO Concept',
      ko: 'BENTO 컨셉',
      ch: 'BENTO 概念'
    },
    content: {
      fr: 'BENTO, ce sont des idées de plats à emporter : pensés pour être mangés vite, comme un vrai repas de bento. Les recettes s\'inspirent surtout des cuisines coréenne, japonaise et chinoise, et de la street food d\'Asie de l\'Est — non pas comme un fourre-tout, mais comme cette nourriture du quotidien, facile à manger à l\'extérieur ou sur le pouce. Une recette au hasard pour décrocher, un catalogue pour filtrer ou chercher — avec tout ce qu\'il faut savoir pour préparer, transporter et manger.',
      en: 'BENTO is about takeaway-friendly meals: meant to be eaten quickly, like a real bento. Recipes draw mainly from Korean, Japanese and Chinese cooking, and from East Asian street food — not as a vague label, but as everyday food that is easy to eat outside or on the go. A random pick to get unstuck, a catalog to filter or search — with what you need to prep, carry and eat.',
      ko: 'BENTO는 도시락처럼 빠르게 먹을 수 있는 외식 아이디어입니다. 한국·일본·중국 요리와 동아시아 길거리 음식에서 영감을 받되, 포괄적인 라벨이 아니라 밖에서·이동 중에 먹기 쉬운 일상 음식으로 다룹니다. 무작위로 한 가지 추천, 필터·검색이 가능한 목록 — 준비·운반·먹는 데 필요한 정보를 함께 제공합니다.',
      ch: 'BENTO 提供外带餐灵感：像真正的便当一样，适合快速食用。食谱主要借鉴韩餐、日餐、中餐，以及东亚街头小吃——不是笼统的标签，而是日常在外、边走边吃也容易的食物。随机一道菜打破僵局，目录可筛选、搜索——并附准备、携带与食用所需的信息。'
    }
  },
  {
    title: {
      fr: 'Lire une recette en bentext',
      en: 'Reading a bentext recipe',
      ko: '벤텍스트 레시피 읽기',
      ch: '阅读 bentext 食谱'
    },
    content: {
      fr: 'Une recette bentext est un fichier texte : des blocs séparés par une ligne qui contient uniquement trois tirets (---).\n\nLe premier bloc est l’identité : nom, nombre de portions, description (souvent une ligne chacun). Viennent ensuite les ingrédients (une ligne par ingrédient, avec | pour séparer nom, quantité, unité, note éventuelle), puis les étapes, éventuellement des conseils, des tags, et enfin un bloc « bento » avec des lignes du type Prefixe|texte (transport, réchauffage, conservation, façon de manger, etc.).\n\nCe format est volontairement compact : il se prête bien à la copie et à l’impression économe en papier — l’idée est d’avoir toute la recette sur une feuille lisible.\n\nLa grammaire complète, les exemples et l’API HTTP qui parse les fichiers .bentext sont documentés dans le dépôt bentext (Go).',
      en: 'A bentext recipe is a plain text file: blocks separated by a line containing only three hyphens (---).\n\nThe first block is identity: name, servings, description (often one line each). Then ingredients (one line per ingredient, using | to separate name, quantity, unit, optional note), then steps, optional tips, tags, and finally a “bento” block with lines like Prefix|text (transport, reheating, storage, how to eat, etc.).\n\nThe format is deliberately compact: it is easy to copy and print with minimal paper — the goal is one readable sheet with the full recipe.\n\nThe full grammar, examples, and the HTTP API that parses .bentext files are documented in the bentext repository (Go).',
      ko: '벤텍스트(bentext) 레시피는 일반 텍스트 파일입니다. 오직 세 개의 하이픈(---)만 있는 줄로 블록을 나눕니다.\n\n첫 블록은 이름, 인분 수, 설명(보통 각각 한 줄)입니다. 이어서 재료(한 줄에 하나, 이름·양·단위·메모는 | 로 구분), 단계, 선택적 팁·태그, 마지막으로 Transport|… 같은 Prefix|텍스트 형식의 벤토 블록이 올 수 있습니다.\n\n형식은 의도적으로 간결해서 복사·인쇄에 적합합니다. 전체 레시피를 한 장에 담는 것이 목표입니다.\n\n전체 문법, 예제, .bentext를 파싱하는 HTTP API는 bentext 저장소(Go)에 정리되어 있습니다.',
      ch: 'bentext 食谱是纯文本文件：用仅含三个连字符（---）的一行分隔各个块。\n\n第一块是身份信息：名称、份数、描述（通常各一行）。接着是食材（每行一种，用 | 分隔名称、用量、单位、可选备注）、步骤、可选小贴士与标签，最后是「便当」块，形如 前缀|正文（携带、复热、冷藏、食用方式等）。\n\n格式刻意紧凑，便于复制与省纸打印——目标是一张纸上读完整条食谱。\n\n完整语法、示例与解析 .bentext 的 HTTP API 见 bentext 开源仓库（Go）。'
    },
    contentPreline: true,
    link: "https://github.com/kazerlelutin/bentext",
    linkText: {
      fr: 'Dépôt bentext (GitHub)',
      en: 'bentext repo (GitHub)',
      ko: 'bentext 저장소 (GitHub)',
      ch: 'bentext 仓库（GitHub）'
    }
  },
  {
    title: {
      fr: 'Soutenez le projet',
      en: 'Support the project',
      ko: '프로젝트 지원하기',
      ch: '支持项目'
    },
    content: {
      fr: 'Si vous aimez BENTO et souhaitez soutenir son développement, vous pouvez m\'offrir un café ! Chaque contribution aide à maintenir et améliorer l\'application.',
      en: 'If you like BENTO and want to support its development, you can buy me a coffee! Every contribution helps maintain and improve the application.',
      ko: 'BENTO를 좋아하고 개발을 지원하고 싶다면, 저에게 커피를 사주실 수 있습니다!',
      ch: '若你喜欢 BENTO 并想支持开发，可以请我喝杯咖啡！每份支持都有助于维护和改进应用。'
    },
    link: "https://ko-fi.com/kazerlelutin",
    linkText: {
      fr: 'Offrir un café',
      en: 'Buy me a coffee',
      ko: '커피 사주기',
      ch: '请我喝咖啡'
    }
  },
  {
    title: {
      fr: 'Mentions légales',
      en: 'Legal notices',
      ko: '법적 고지',
      ch: '法律声明'
    },
    content: {
      fr: 'Les recettes sont à titre indicatif, aucune garantie de résultat. Tout le contenu est sous licence Creative Commons. La mesure d’audience (Matomo) et les préférences (langue, choix cookies) sont décrites dans la politique de confidentialité.',
      en: 'Recipes are for informational purposes only, no guarantee of results. All content is under Creative Commons license. Audience measurement (Matomo) and preferences (language, cookie choice) are described in the privacy policy.',
      ko: '레시피는 참고용이며 결과 보장은 없습니다. 콘텐츠는 Creative Commons 라이선스입니다. 방문 분석(Matomo) 및 설정(언어·쿠키 선택)은 개인정보 처리방침에 설명되어 있습니다.',
      ch: '食谱仅供参考，不保证效果。内容采用 Creative Commons 许可。访问统计（Matomo）与偏好（语言、Cookie 选择）详见隐私政策。'
    }
  }
];

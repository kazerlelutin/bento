export const ABOUT_CONTAINER_ID = 'about-container';
export const ABOUT_ITEMS_CONTAINER_ID = 'about-items-container';

export const ABOUT_ITEM_TEMPLATE_ID = 'about-item-template';

export const aboutTitle = {
  fr: 'À propos',
  en: 'About',
  ko: '약간',
  ch: '关于'
};

export const aboutContent = [
  {
    title: {
      fr: 'Qui suis-je ?',
      en: 'Who am I?',
      ko: '나는 누구인가?',
      ch: '我是谁？'
    },
    content: {
      fr: 'Je suis Benoist Bouteiller, créateur de jeux, animateur pixel art et développeur d\'applications. Passionné par la cuisine japonaise et le pixel art, j\'ai créé BENTO pour vous aider à trouver des recettes végétariennes quand vous n\'avez pas d\'idée, avec un côté ludique et des mini-jeux.',
      en: 'I am Benoist Bouteiller, game creator, pixel art animator and app developer. Passionate about Japanese cuisine and pixel art, I created BENTO to help you find vegetarian recipes when you have no idea what to cook, with a fun side and mini-games.',
      ko: '저는 게임 제작자, 픽셀 아트 애니메이터, 앱 개발자인 Benoist Bouteiller입니다. 일본 요리와 픽셀 아트에 대한 열정으로 BENTO를 만들어, 요리 아이디어가 없을 때 채식 레시피를 찾고 미니 게임을 즐길 수 있게 했습니다.',
      ch: '我是 Benoist Bouteiller，游戏创作者、像素画师和应用开发者。出于对日料和像素艺术的热爱，我做了 BENTO，帮你在没灵感时发现素食食谱，并配有迷你游戏。'
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
      fr: 'BENTO propose des recettes végétariennes quand vous n\'avez pas d\'idée. Au lieu d\'un catalogue, vous découvrez les recettes par un système de match : like, rejet ou sauvegarde. Des mini-jeux autour des ingrédients et de la cuisine ajoutent un côté ludique, le tout avec un design pixel art.',
      en: 'BENTO suggests vegetarian recipes when you have no idea what to cook. Instead of a catalogue, you discover recipes through a match-style flow: like, reject or save. Mini-games around ingredients and cooking add a fun touch, all with a pixel art design.',
      ko: 'BENTO는 요리할 게 없을 때 채식 레시피를 제안합니다. 카탈로그 대신 매치 방식으로 레시피를 발견하고, 재료와 요리 테마의 미니 게임을 즐기며 픽셀 아트 디자인을 경험할 수 있습니다.',
      ch: 'BENTO 在你没想法时推荐素食食谱。不用目录，用匹配方式发现食谱：喜欢、跳过或收藏。围绕食材和烹饪的迷你游戏增添趣味，配合像素风设计。'
    }
  },
  {
    title: {
      fr: 'Découvrir et retrouver',
      en: 'Discover and find again',
      ko: '발견하고 다시 찾기',
      ch: '发现与找回'
    },
    content: {
      fr: 'L\'expérience vise d\'abord la découverte : une recette à la fois, sans se perdre dans une liste. Vous pouvez sauvegarder vos préférées et les retrouver dans « Mes sauvegardes ». Idéal pour la cuisine du quotidien, les recettes végétariennes et les repas faciles à transporter.',
      en: 'The experience is first about discovery: one recipe at a time, without getting lost in a list. You can save your favorites and find them in "My favorites". Ideal for everyday cooking, vegetarian recipes and easy-to-carry meals.',
      ko: '한 번에 한 가지 레시피를 발견하는 경험을 제공합니다. 마음에 드는 것은 저장해 두고 "내 저장"에서 다시 찾을 수 있습니다. 일상 요리와 채식 레시피에 적합합니다.',
      ch: '体验以发现为主：一次一道食谱，不会在列表中迷失。可收藏喜欢的并在「我的收藏」中找回。适合日常素食与便携餐。'
    }
  },
  {
    title: {
      fr: 'Technologie',
      en: 'Technology',
      ko: '기술',
      ch: '技术'
    },
    content: {
      fr: 'BENTO est développé avec Vanilla JavaScript/TypeScript, HTML et CSS. Hébergé chez Infomaniak, l\'application utilise IndexedDB pour le stockage local et Bun comme runtime. Aucun framework lourd, juste du code simple et efficace.',
      en: 'BENTO is developed with Vanilla JavaScript/TypeScript, HTML and CSS. Hosted at Infomaniak, the app uses IndexedDB for local storage and Bun as runtime. No heavy framework, just simple and efficient code.',
      ko: 'BENTO는 Vanilla JavaScript/TypeScript, HTML, CSS로 개발되었습니다. Infomaniak에서 호스팅되며, 로컬 저장소로 IndexedDB, 런타임으로 Bun을 사용합니다.',
      ch: 'BENTO 使用 Vanilla JavaScript/TypeScript、HTML 和 CSS 开发。托管于 Infomaniak，本地存储用 IndexedDB，运行时为 Bun。无重框架，代码简洁高效。'
    },
    link: "https://github.com/kazerlelutin/bento",
    linkText: {
      fr: 'Code source',
      en: 'Source code',
      ko: '소스 코드',
      ch: '源代码'
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
      fr: 'Les recettes sont à titre indicatif, aucune garantie de résultat. Tout le contenu est sous licence Creative Commons. Aucun cookie n\'est utilisé sur ce site.',
      en: 'Recipes are for informational purposes only, no guarantee of results. All content is under Creative Commons license. No cookies are used on this site.',
      ko: '레시피는 참고용이며, 결과에 대한 보장은 없습니다. 모든 콘텐츠는 Creative Commons 라이선스 하에 있습니다. 이 사이트에서는 쿠키를 사용하지 않습니다.',
      ch: '食谱仅供参考，不保证效果。所有内容采用 Creative Commons 许可。本站不使用 cookie。'
    }
  }
];

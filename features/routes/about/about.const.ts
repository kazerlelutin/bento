
export const ABOUT_CONTAINER_ID = 'about-container';
export const ABOUT_ITEMS_CONTAINER_ID = 'about-items-container';

export const ABOUT_ITEM_TEMPLATE_ID = 'about-item-template';

export const aboutTitle = {
  fr: 'À propos',
  en: 'About',
  ko: '약간'
}

export const aboutContent = [
  {
    title: {
      fr: 'Qui suis-je ?',
      en: 'Who am I ?',
      ko: '나는 누구인가?'
    },
    content: {
      fr: 'Je suis Benoist Bouteiller, créateur de jeux, animateur pixel art et développeur d\'applications. Passionné par la cuisine japonaise et le pixel art, j\'ai créé BENTO pour partager cette passion de manière ludique et interactive.',
      en: 'I am Benoist Bouteiller, game creator, pixel art animator and app developer. Passionate about Japanese cuisine and pixel art, I created BENTO to share this passion in a fun and interactive way.',
      ko: '저는 게임 제작자, 픽셀 아트 애니메이터, 앱 개발자인 Benoist Bouteiller입니다. 일본 요리와 픽셀 아트에 대한 열정으로 BENTO를 만들어 이 열정을 재미있고 상호작용적인 방식으로 공유하고 있습니다.'
    },
    link: "http://bouteiller.contact/",
    linkText: {
      fr: 'Me contacter',
      en: 'Contact me',
      ko: '연락하기'
    }
  },
  {
    title: {
      fr: 'Concept BENTO',
      en: 'BENTO Concept',
      ko: 'BENTO 컨셉'
    },
    content: {
      fr: 'BENTO transforme la création de bento en une expérience interactive et amusante. Composez votre propre bento végétarien en choisissant chaque ingrédient étape par étape, avec un design rétro en pixel art.',
      en: 'BENTO turns bento creation into an interactive and fun experience. Compose your own vegetarian bento by choosing each ingredient step by step, with a retro pixel art design.',
      ko: 'BENTO는 벤토 만들기를 상호작용적이고 재미있는 경험으로 바꿉니다. 레트로 픽셀 아트 디자인으로 각 재료를 단계별로 선택하여 자신만의 채식 벤토를 구성하세요.'
    }
  },
  {
    title: {
      fr: 'Objectif : Créer, pas stocker',
      en: 'Goal: Create, not store',
      ko: '목표: 저장이 아닌 창조'
    },
    content: {
      fr: 'L\'objectif n\'est pas de sauvegarder des recettes mais de permettre aux utilisateurs de générer une image de leur bento, de partager ce contenu sur les réseaux sociaux, de s\'amuser en composant et de découvrir la street food japonaise végétarienne, parfaite pour la cuisine au travail et facile à transporter.',
      en: 'The goal is not to save recipes but to let users generate an image of their bento, share this content on social media, have fun composing and discover Japanese vegetarian street food, perfect for work meals and easy to transport.',
      ko: '목표는 레시피를 저장하는 것이 아니라 사용자가 벤토 이미지를 생성하고, 소셜 미디어에 이 콘텐츠를 공유하며, 구성하는 재미를 가지고 일본 채식 스트리트 푸드를 발견할 수 있도록 하는 것입니다. 직장 식사에 완벽하고 휴대하기 쉽습니다.'
    }
  },
  {
    title: {
      fr: 'Technologie',
      en: 'Technology',
      ko: '기술'
    },
    content: {
      fr: 'BENTO est développé avec Vanilla JavaScript/TypeScript, HTML et CSS. Hébergé chez Infomaniak, l\'application utilise IndexedDB pour le stockage local et Bun comme runtime. Aucun framework lourd, juste du code simple et efficace.',
      en: 'BENTO is developed with Vanilla JavaScript/TypeScript, HTML and CSS. Hosted at Infomaniak, the app uses IndexedDB for local storage and Bun as runtime. No heavy framework, just simple and efficient code.',
      ko: 'BENTO는 Vanilla JavaScript/TypeScript, HTML, CSS로 개발되었습니다. Infomaniak에서 호스팅되며, 앱은 로컬 저장소용 IndexedDB와 런타임용 Bun을 사용합니다. 무거운 프레임워크 없이, 단순하고 효율적인 코드만 사용합니다.'
    },
    link: "https://github.com/kazerlelutin/bento",
    linkText: {
      fr: 'Code source',
      en: 'Source code',
      ko: '소스 코드'
    }
  },
  {
    title: {
      fr: 'Soutenez le projet',
      en: 'Support the project',
      ko: '프로젝트 지원하기'
    },
    content: {
      fr: 'Si vous aimez BENTO et souhaitez soutenir son développement, vous pouvez m\'offrir un café ! Chaque contribution aide à maintenir et améliorer l\'application.',
      en: 'If you like BENTO and want to support its development, you can buy me a coffee! Every contribution helps maintain and improve the application.',
      ko: 'BENTO를 좋아하고 개발을 지원하고 싶다면, 저에게 커피를 사주실 수 있습니다! 모든 기여는 애플리케이션을 유지하고 개선하는 데 도움이 됩니다.'
    },
    link: "https://ko-fi.com/kazerlelutin",
    linkText: {
      fr: 'Offrir un café',
      en: 'Buy me a coffee',
      ko: '커피 사주기'
    }
  },
  {
    title: {
      fr: 'Mentions légales',
      en: 'Legal notices',
      ko: '법적 고지'
    },
    content: {
      fr: 'Les recettes sont à titre indicatif, aucune garantie de résultat. Tout le contenu est sous licence Creative Commons. Aucun cookie n\'est utilisé sur ce site.',
      en: 'Recipes are for informational purposes only, no guarantee of results. All content is under Creative Commons license. No cookies are used on this site.',
      ko: '레시피는 참고용이며, 결과에 대한 보장은 없습니다. 모든 콘텐츠는 Creative Commons 라이선스 하에 있습니다. 이 사이트에서는 쿠키를 사용하지 않습니다.'
    }
  }
]
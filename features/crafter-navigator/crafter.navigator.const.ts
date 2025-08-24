import type { Step } from "./crafter-navigator.types";

export const CONTAINER_ID = 'crafter-controls';

export const steps: Step[] = [
  {
    name: 'base',
    title: {
      fr: 'Choisir sa base',
      en: 'Choose your base',
      ko: '기본 선택',
    },
    alt: {
      fr: 'icon représentant la page de choix de base',
      en: 'icon representing the base choice page',
      ko: '기본 선택 페이지를 나타내는 아이콘',
    },
    description: {
      fr: 'Choisissez la base de votre recette',
      en: 'Choose the base of your recipe',
      ko: '기본 선택',
    },

  },
  {
    name: 'composer',
    title: {
      fr: 'Composeur',
      en: 'Composer',
      ko: '구성',
    },
    alt: {
      fr: 'icon représentant la page de composition',
      en: 'icon representing the composition page',
      ko: '구성 페이지를 나타내는 아이콘',
    },
    description: {
      fr: 'Composez votre recette',
      en: 'Compose your recipe',
      ko: '구성',
    },

  },
  {
    name: 'export',
    title: {
      fr: 'Export',
      en: 'Export',
      ko: '내보내기',
    },
    alt: {
      fr: 'icon représentant la page d\'exportation',
      en: 'icon representing the export page',
      ko: '내보내기 페이지를 나타내는 아이콘',
    },
    description: {
      fr: 'Exportez votre recette',
      en: 'Export your recipe',
      ko: '내보내기',
    },

  },
]
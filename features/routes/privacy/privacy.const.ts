import type { AboutContentItem } from "@features/routes/about/about.types";

export const PRIVACY_CONTAINER_ID = "privacy-container";
export const PRIVACY_ITEMS_CONTAINER_ID = "privacy-items-container";

/** Titres et paragraphes (même schéma que la page À propos). */
export const privacyPageTitle = {
  fr: "Politique de confidentialité",
  en: "Privacy policy",
  ko: "개인정보 처리방침",
  ch: "隐私政策",
} as const;

export const privacyContent: AboutContentItem[] = [
  {
    title: {
      fr: "Introduction",
      en: "Introduction",
      ko: "소개",
      ch: "简介",
    },
    content: {
      fr: "Le site BENTO (ben-to.fr) est édité par Benoist Bouteiller. Cette page décrit quelles données peuvent être traitées lorsque vous utilisez le site, dans le respect du Règlement général sur la protection des données (RGPD) et de la législation applicable.",
      en: "The BENTO site (ben-to.fr) is published by Benoist Bouteiller. This page describes what data may be processed when you use the site, in line with the GDPR and applicable law.",
      ko: "BENTO(ben-to.fr) 사이트는 Benoist Bouteiller가 운영합니다. 이 페이지는 GDPR 및 관련 법에 따라 사이트 이용 시 처리될 수 있는 데이터를 설명합니다.",
      ch: "BENTO 网站（ben-to.fr）由 Benoist Bouteiller 发布。本页说明在您使用本站时可能处理哪些数据，并遵循 GDPR 与适用法律。",
    },
  },
  {
    title: {
      fr: "Mesure d’audience (Matomo)",
      en: "Audience measurement (Matomo)",
      ko: "방문 분석(Matomo)",
      ch: "访问统计（Matomo）",
    },
    content: {
      fr: "Si vous acceptez via le bandeau cookies, nous chargeons Matomo (analytics.ben-to.fr), hébergé par nos soins. Matomo permet de comprendre comment le site est utilisé (pages vues, navigation). Vous pouvez retirer votre consentement en effaçant les données du site pour ce domaine dans les paramètres de votre navigateur et en ne réacceptant pas le bandeau. Le refus au bandeau n’envoie aucune donnée à Matomo.",
      en: "If you accept via the cookie banner, we load Matomo (analytics.ben-to.fr), self-hosted. Matomo helps us understand how the site is used (page views, navigation). You can withdraw consent by clearing site data for this domain in your browser settings and not accepting the banner again. If you decline the banner, no data is sent to Matomo.",
      ko: "쿠키 배너에서 동의하면 Matomo(analytics.ben-to.fr, 자체 호스팅)를 불러옵니다. Matomo는 페이지 조회·탐색 등 사이트 이용 방식을 이해하는 데 도움이 됩니다. 브라우저에서 이 도메인의 사이트 데이터를 삭제하고 배너를 다시 수락하지 않으면 동의를 철회할 수 있습니다. 배너를 거부하면 Matomo로 데이터가 전송되지 않습니다.",
      ch: "若您通过 Cookie 横幅同意，我们会加载自托管的 Matomo（analytics.ben-to.fr）。Matomo 用于了解网站使用情况（页面浏览、导航）。您可在浏览器设置中清除本域名的网站数据并不再接受横幅，以撤回同意。拒绝横幅时不会向 Matomo 发送任何数据。",
    },
  },
  {
    title: {
      fr: "Cookies et stockage local",
      en: "Cookies and local storage",
      ko: "쿠키 및 로컬 저장소",
      ch: "Cookie 与本地存储",
    },
    content: {
      fr: "Un cookie peut être utilisé pour mémoriser la langue d’affichage (préférence de navigation). Le choix concernant Matomo est enregistré dans le stockage local de votre navigateur (clé technique dédiée) pour ne pas vous redemander à chaque visite. Vous pouvez supprimer ces données depuis les paramètres du navigateur.",
      en: "A cookie may be used to remember the display language (navigation preference). Your Matomo choice is stored in your browser’s local storage (a dedicated technical key) so we do not ask again on every visit. You can delete this data in your browser settings.",
      ko: "표시 언어를 기억하기 위해 쿠키가 사용될 수 있습니다(탐색 설정). Matomo 선택은 방문할 때마다 묻지 않도록 브라우저 로컬 저장소(전용 기술 키)에 저장됩니다. 브라우저 설정에서 삭제할 수 있습니다.",
      ch: "可能使用 Cookie 记住显示语言（浏览偏好）。关于 Matomo 的选择保存在浏览器本地存储（专用键），以免每次访问都询问。您可在浏览器设置中删除这些数据。",
    },
  },
  {
    title: {
      fr: "Contenus et API recettes",
      en: "Recipe content and API",
      ko: "레시피 콘텐츠 및 API",
      ch: "食谱内容与 API",
    },
    content: {
      fr: "Les fiches recettes sont chargées depuis une API dédiée (bentext) pour affichage dans votre navigateur. Seules les requêtes nécessaires au fonctionnement du site sont effectuées.",
      en: "Recipe pages are loaded from a dedicated API (bentext) for display in your browser. Only the requests needed for the site to work are made.",
      ko: "레시피 정보는 전용 API(bentext)에서 브라우저에 표시하기 위해 불러옵니다. 사이트 동작에 필요한 요청만 수행됩니다.",
      ch: "食谱通过专用 API（bentext）加载并在浏览器中展示。仅发起网站运行所需的请求。",
    },
  },
  {
    title: {
      fr: "Vos droits",
      en: "Your rights",
      ko: "귀하의 권리",
      ch: "您的权利",
    },
    content: {
      fr: "Vous disposez notamment d’un droit d’accès, de rectification et d’effacement des données vous concernant lorsque la loi l’exige, ainsi que d’un droit d’introduire une réclamation auprès de l’autorité de protection des données (en France : CNIL). Pour toute question liée à cette politique, vous pouvez nous contacter via le site indiqué à la page « À propos ».",
      en: "You have the right to access, rectify and erase personal data about you where the law requires, and to lodge a complaint with a data protection authority (in France: CNIL). For questions about this policy, contact us via the site linked on the About page.",
      ko: "법이 정하는 경우 개인정보에 대한 열람·정정·삭제를 요청할 수 있으며, 개인정보 보호 기관에 불만을 제기할 수 있습니다(프랑스: CNIL). 본 정책 관련 문의는 « 정보 » 페이지에 안내된 사이트로 연락해 주세요.",
      ch: "在法律规定的范围内，您有权访问、更正和删除与您相关的个人数据，并有权向监管机构投诉（法国：CNIL）。有关本政策的疑问，请通过「关于」页面所示网站联系我们。",
    },
  },
];

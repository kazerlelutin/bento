import type { Step } from "./crafter-navigator.types";
import homeIcon from "../../public/icons/home.png";
import baseIcon from "../../public/icons/base.png";
import composerIcon from "../../public/icons/composer.png";
import exportIcon from "../../public/icons/export.png";

export const CONTAINER_ID = 'crafter-controls';

export const steps: Step[] = [
  {
    name: 'home',
    title: 'Accueil',
    icon: homeIcon,
    alt: 'icon représentant la page d\'accueil',
  },
  {
    name: 'base',
    title: 'Choisir sa base',
    icon: baseIcon,
    alt: 'icon représentant la page de choix de base',
  },
  {
    name: 'composer',
    title: 'Composeur',
    icon: composerIcon,
    alt: 'icon représentant la page de composition',
  },
  {
    name: 'export',
    title: 'Export',
    icon: exportIcon,
    alt: 'icon représentant la page d\'exportation',
  },
]
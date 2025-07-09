import type { Step } from "./crafter-navigator.types";

export const CONTAINER_ID = 'crafter-controls';

export const steps: Step[] = [
  {
    id: '1',
    name: 'home',
    title: 'Accueil',
  },
  {
    id: '2',
    name: 'base',
    title: 'Choisir sa base',
  },
  {
    id: "3",
    name: 'composer',
    title: 'Composeur',
  },
  {
    id: '4',
    name: 'export',
    title: 'Export',
  },
]
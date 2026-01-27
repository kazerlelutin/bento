import type { RouteDef } from "../routes.type";
import { cardPageCtrl } from "./card.ctrl";

const route: RouteDef = ['/', { path: '/', title: 'BEN(TO)', templateId: 'card', ctrl: cardPageCtrl }]

export default route
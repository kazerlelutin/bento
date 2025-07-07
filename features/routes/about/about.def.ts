import type { RouteDef } from "../routes.type";
import aboutCtrl from "./about.ctrl";

const route: RouteDef = ['/about', { path: '/about', title: 'À propos', templateId: 'about-template', ctrl: aboutCtrl }]

export default route
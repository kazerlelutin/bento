import type { RouteDef } from "../routes.type";
import homeCtrl from "./home.ctrl";

const route: RouteDef = ['/', { path: '/', title: 'BEN(TO)', templateId: 'crafter-template', ctrl: homeCtrl }]

export default route
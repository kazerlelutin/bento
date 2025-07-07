export type Ctrl = {
  init?: () => void
  cleanUp?: () => void
}

export interface Route {
  path: string;
  title: string;
  templateId: string;
  ctrl?: Ctrl
}

export type RouteDef = [string, Route]
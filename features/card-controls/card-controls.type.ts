import { Ctrl } from "@features/routes/routes.type";

export type CardControlsCtrl = Ctrl & {
  handleClick: (e: Event) => void;
}
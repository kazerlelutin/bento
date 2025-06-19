/* Import TailwindCSS in your JavaScript */
import { router } from "./features/router/router";
import "tailwindcss";
import "./styles.css";

addEventListener("DOMContentLoaded", () => {
  router.init();
});
import { createElement } from "./utils/create-dom.js";

//#region app
export const app = document.getElementById("app") as HTMLDivElement;

// MARK: theme
type Theme = "dark" | "light";
app.dataset.theme = "dark";

export function setTheme(theme: Theme) {
  app.dataset.theme = theme;
}

export function handleAutoTheme(event: MediaQueryList | MediaQueryListEvent) {
  setTheme(event.matches ? "dark" : "light");
}

export const colorSchemeQuery = window.matchMedia("(prefers-color-scheme:dark)");
colorSchemeQuery.addEventListener("change", handleAutoTheme);
// document.addEventListener("DOMContentLoaded", () => { handleAutoTheme(colorSchemeQuery); });

// MARK: orientation
function checkOrientation() {
  app.dataset.orientation = window.innerHeight < window.innerWidth ? "horizontal" : "vertical";
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("load", checkOrientation);

//#endregion app

export const panelContainer = createElement("div", {
  className: "panel-container",
});
app.appendChild( panelContainer );

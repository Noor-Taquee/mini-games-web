import { createElement } from "./utils/create-dom.js";

export const app = document.getElementById("app") as HTMLDivElement;

app.dataset.theme = "light";

export const panelContainer = createElement("div", {
  className: "tab-container",
});

app.append(panelContainer);

import { createElement } from "./utils/create-dom.js";

export const app = createElement("div", {
  id: "wordle-panel",
  className: "app-panel",
});

export const panelContainer = createElement("div", {
  className: "tab-container",
});

app.append(panelContainer);

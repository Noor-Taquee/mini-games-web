import { createElement } from "./utils/create-dom.js";

export const app = createElement("div", { id: "app-panel" });

export const panelContainer = createElement("div", {
  className: "panel-container",
});
app.appendChild(panelContainer);

import "./app.css";

import { createElement } from "./utils/create-dom";

export const app = document.getElementById("app") as HTMLDivElement;
app.dataset.theme = "light";

app.dataset.orientation = "vertical";

export const panelContainer = createElement("div", {
  className: "panel-container",
});

app.append(panelContainer);

import "./app.css";

import { createElement } from "./utils/create-dom";

export const app = document.getElementById("app") as HTMLDivElement;
app.dataset.theme = "light";

app.dataset.orientation = "vertical";

function updateOrientation() {
  app.dataset.orientation =
    window.innerWidth > window.innerHeight ? "horizontal" : "vertical";
}

window.addEventListener("resize", updateOrientation);
window.addEventListener("load", updateOrientation);

export const panelContainer = createElement("div", {
  className: "panel-container",
});

app.append(panelContainer);

import "./home-panel.css";

import { createElement } from "../../utils/create-dom.js";
import { changeHash } from "../../utils/event";

export const homePanel = createElement("div", {
  id: "home-panel",
  className: "app-panel",
});

//#region panel bar
const panelBar = createElement("div", {
  className: "panel-bar",
});

const panelName = createElement("p", {
  className: "panel-name",
  textContent: "tic-tac-toe",
});

const accountBtn = createElement(
  "button",
  {
    title: "Settings",
    id: "settings-btn",
    className: "toggle-btn",
  },
  [createElement("i", { className: "ph-bold ph-gear-fine" })]
);

panelBar.append(panelName, accountBtn);
//#endregion panel bar

//#region content
const contentDiv = createElement("div", {
  className: "content-div",
});

const playBtn = createElement(
  "button",
  {
    id: "daily-puzzle-btn",
    className: "action-btn",
  },
  [
    createElement("i", { className: "ph-fill ph-play" }),
    createElement("p", { textContent: "Play" }),
  ]
);
playBtn.addEventListener("click", () => {
  changeHash("playing");
  document.dispatchEvent(new Event("new-game"));
});

const settingsBtn = createElement(
  "button",
  {
    id: "settings-btn",
    className: "action-btn",
  },
  [
    createElement("i", { className: "ph-fill ph-gear" }),
    createElement("p", { textContent: "Settings" }),
  ]
);
settingsBtn.addEventListener("click", () => {
  changeHash("settings");
});

contentDiv.append(playBtn);
//#endregion content

homePanel.append(panelBar, contentDiv);

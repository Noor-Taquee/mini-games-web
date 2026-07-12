import "./home-panel.css";

import { createElement } from "../../utils/create-dom.js";
import { changeHash, eventBus } from "../../utils/event";

import { createActionBtn } from "../../../../components/action-btn/script.js";
import { createToggleBtn } from "../../../../components/toggle-btn/script.js";

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

const accountBtn = createToggleBtn("ph-bold ph-gear-fine");
accountBtn.id = "account-btn";
accountBtn.title = "Settings";

panelBar.append(panelName, accountBtn);
//#endregion panel bar

//#region content
const panelContent = createElement("div", {
  className: "panel-content",
});

const playBtn = createActionBtn("ph-fill ph-play", "Play", {
  size: "large",
  center: "x",
});
playBtn.addEventListener("click", () => {
  changeHash("playing");
  eventBus.dispatchEvent(new Event("new-game"));
});

const settingsBtn = createActionBtn("ph-fill ph-gear", "Settings", {
  size: "large",
  center: "x",
});
settingsBtn.addEventListener("click", () => {
  changeHash("settings");
});

panelContent.append(playBtn);
//#endregion content

homePanel.append(panelBar, panelContent);

import { createElement } from "../../utils/create-dom.js";
import { changeHash } from "../../utils/event.js";

import { createToggleBtn } from "../../../../components/toggle-btn/script.js";

export const settingsPanel = createElement("div", {
  id: "settings-panel",
  className: "app-panel",
});

//#region panel Bar
const panelBar = createElement("div", {
  className: "top-bar",
});

const panelNameDiv = createElement("div", {
  className: "panel-name-div",
});
const backBtn = createToggleBtn("ph-bold ph-caret-left");
backBtn.title = "Back";
const panelName = createElement("p", {
  className: "panel-name",
  textContent: "settings",
});
panelNameDiv.append(backBtn, panelName);

backBtn.addEventListener("click", () => {
  changeHash("home");
});

panelBar.append(panelNameDiv);
//#endregion panel Bar

//#region content
const contentDiv = createElement("div", { className: "content-div" });

const appearanceSection = createElement("div", {
  id: "appearance-section",
  className: "settings-section",
});

contentDiv.append(appearanceSection);
//#endregion content

settingsPanel.append(panelBar, contentDiv);

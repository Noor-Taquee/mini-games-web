import { createElement } from "../../utils/create-dom.js";
import { changeHash } from "../../utils/event.js";

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
const backBtn = createElement(
  "button",
  {
    title: "Back",
    className: "toggle-btn",
  },
  [createElement("i", { className: "ph-bold ph-caret-left" })]
);
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

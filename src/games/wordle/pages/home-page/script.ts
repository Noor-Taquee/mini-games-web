import { createElement } from "../../utils/create-dom.js";
import { changeHash, eventBus } from "../../utils/event.js";

import { createActionBtn } from "../../../../components/action-btn/script.js";

export const homePanel = createElement("div", {
  id: "home-panel",
  className: "app-panel",
});

const panelBar = createElement("div", {
  className: "panel-bar",
});
const panelNameDiv = createElement("div", {
  className: "panel-name-div",
});
const panelName = createElement("p", {
  className: "panel-name",
  textContent: "Guess the word",
});

panelNameDiv.append(panelName);

panelBar.append(panelNameDiv);

//#region content
const panelContent = createElement("div", {
  className: "panel-content",
});

const playBtn = createActionBtn("ph-fill ph-play", "play", {
  size: "large",
  center: "x",
});
playBtn.addEventListener("click", () => {
  eventBus.dispatchEvent(new Event("new-game"));
  changeHash("playing");
});
panelContent.append(playBtn);
//#endregion content

homePanel.append(panelBar, panelContent);

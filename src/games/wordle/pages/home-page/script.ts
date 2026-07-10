import { createElement } from "../../utils/create-dom.js";
import { changeHash } from "../../utils/event.js";

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

const playBtn = createElement(
  "button",
  {
    title: "Play",
    id: "play-btn",
    className: "action-btn",
  },
  [
    createElement("i", { className: "ph-fill ph-play" }),
    createElement("p", {
      textContent: "play",
    }),
  ]
);
playBtn.addEventListener("click", () => {
  document.dispatchEvent(new Event("new-game"));
  changeHash("playing");
});
panelContent.append(playBtn);
//#endregion content

homePanel.append(panelBar, panelContent);

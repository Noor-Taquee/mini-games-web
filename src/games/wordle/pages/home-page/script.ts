import { createElement } from "../../utils/create-dom.js";

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
const contentDiv = createElement("div", {
  className: "content-div",
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
  window.location.hash = "#playing";
});
contentDiv.append(playBtn);
//#endregion content

homePanel.append(panelBar, contentDiv);

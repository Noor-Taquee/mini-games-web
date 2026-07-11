import "./style.css";

import { createElement } from "../../utils/create-dom.js";
import { changeHash } from "../../utils/event.js";

import { attemptBoxFrame } from "../../core/engine.js";
import { keyboard } from "../../components/keyboard/script.js";

export const playingPanel = createElement("div", {
  id: "attempt-panel",
  className: "app-panel",
});

//#region top bar
const panelBar = createElement("div", {
  className: "panel-bar",
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
const gameName = createElement(
  "p",
  {
    className: "panel-name",
    textContent: "guess the word",
  }
  // [
  //   createElement("span", { textContent: "Guess" }),
  //   createElement("span", { textContent: "The" }),
  //   createElement("span", { textContent: "Word" }),
  // ],
);
panelNameDiv.append(backBtn, gameName);

backBtn.addEventListener("click", () => {
  changeHash("home");
});

const accountBtn = createElement("button", {
  title: "Account",
  id: "account-btn",
  className: "toggle-btn",
});
accountBtn.addEventListener("click", () => {
  changeHash("home");
});

panelBar.append(panelNameDiv, accountBtn);
//#endregion top bar

//#region content
const panelContent = createElement("div", {
  className: "panel-content",
});

panelContent.append(attemptBoxFrame, keyboard);
//#endregion content

playingPanel.append(panelBar, panelContent);

import "./custom-panel.css";

import { createElement } from "../../utils/create-dom.js";
import { modifyInputDiv } from "../../utils/UI/input.js";

import { createSourceBoard, gameState } from "../../core/sudoku.js";

export const customPanel = createElement("div", {
  id: "custom-panel",
  className: "app-panel",
});

//#region panel Bar
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
const gameName = createElement("p", {
  className: "panel-name",
  textContent: "sudoku",
});
panelNameDiv.append(backBtn, gameName);

backBtn.addEventListener("click", () => {
  window.location.hash = "#home";
});

const helpBtn = createElement(
  "button",
  {
    title: "Help",
    className: "toggle-btn",
  },
  [createElement("i", { className: "ph-bold ph-question-mark" })]
);

panelBar.append(panelNameDiv, helpBtn);
//#endregion panel Bar

//#region content
const contentDiv = createElement("div", {
  className: "content-div",
  id: "source-input-div",
});

const sourceInputDiv = createElement("div", {
  className: "input-div",
});
const sourceLabel = createElement("p", {
  className: "input-label",
  textContent: "Source",
});
const sourceInput = createElement("input", {
  name: "source-input",
  type: "text",
  id: "source-input",
  className: "type-input",
});
modifyInputDiv(sourceInput, sourceInputDiv);
sourceInputDiv.append(sourceLabel, sourceInput);

const createBtn = createElement(
  "button",
  {
    title: "Create",
    id: "create-btn",
    className: "action-btn",
  },
  [
    createElement("p", { textContent: "Next" }),
    createElement("i", { className: "ph-bold ph-arrow-right" }),
  ]
);

createBtn.addEventListener("click", () => {
  const source = sourceInput.value;
  if (source.length < 1 || source.length > 81) {
    sourceInputDiv.classList.add("wrong");
    sourceInputDiv.classList.add("shake");
    sourceInputDiv.addEventListener(
      "animationend",
      () => {
        sourceInputDiv.classList.remove("shake");
      },
      { once: true }
    );
    return;
  }

  document.dispatchEvent(new Event("prepare-board"));

  const dSource = createSourceBoard(source);

  gameState.boardState = {
    puzzle: dSource,
    currentState: dSource,
    solution: dSource,
    difficulty: "custom",
    mistakes: 0,
    history: [],
  };
  document.dispatchEvent(new CustomEvent("render-board"));
});

contentDiv.append(sourceInputDiv, createBtn);
//#endregion content

customPanel.append(panelBar, contentDiv);

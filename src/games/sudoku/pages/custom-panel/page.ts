import "./custom-panel.css";

import { createElement } from "../../utils/create-dom.js";
import { changeHash } from "../../utils/event.js";

import { modifyInputDiv } from "../../components/material-input/input.js";

import { createSourceBoard, gameState } from "../../core/sudoku.js";
import { createActionBtn } from "../../../../components/action-btn/script";
import { createToggleBtn } from "../../../../components/toggle-btn/script";

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

const backBtn = createToggleBtn("ph-bold ph-caret-left");
backBtn.title = "Back";
backBtn.addEventListener("click", () => changeHash("home"));

const gameName = createElement("p", {
  className: "panel-name",
  textContent: "sudoku",
});

panelNameDiv.append(backBtn, gameName);

const helpBtn = createToggleBtn("ph-bold ph-question-mark");
helpBtn.title = "Help";

panelBar.append(panelNameDiv, helpBtn);
//#endregion panel Bar

//#region content
const panelContent = createElement("div", {
  className: "panel-content",
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

const createBtn = createActionBtn("ph-bold ph-arrow-right", "Next", {
  size: "large",
  center: "x",
});

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

panelContent.append(sourceInputDiv, createBtn);
//#endregion content

customPanel.append(panelBar, panelContent);

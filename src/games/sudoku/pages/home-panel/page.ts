import "./home-panel.css";

import { createElement } from "../../utils/create-dom.js";
import { dosukuApi, type DosukuData } from "../../api/dosuku.js";

export const homePanel = createElement("div", {
  id: "home-panel",
  className: "app-panel",
});

//#region panel bar
const panelBar = createElement("div", {
  className: "panel-bar",
});

const gameName = createElement("p", {
  className: "panel-name",
  textContent: "sudoku",
});

const accountBtn = createElement(
  "button",
  {
    title: "Settings",
    id: "settings-btn",
    className: "toggle-btn",
  },
  [createElement("i", { className: "ph-bold ph-user" })]
);

panelBar.append(gameName, accountBtn);
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
playBtn.addEventListener("click", fetchPuzzle);

export let puzzleFetchController = new AbortController();

async function fetchPuzzle() {
  puzzleFetchController.abort();

  puzzleFetchController = new AbortController();
  document.dispatchEvent(new Event("prepare-board"));

  try {
    const response = await fetch(dosukuApi, {
      signal: puzzleFetchController.signal,
    });
    const data: DosukuData = await response.json();

    const source = data.newboard.grids[0];
    if (!source) {
      document.dispatchEvent(new CustomEvent("show-board-error"));
      return;
    }

    const sourcePuzzle = source.value.flat().join("");

    window.location.hash = `#playing&puzzle=${sourcePuzzle}&difficulty=${source.difficulty}`;
  } catch (er: any) {
    if (er.name == "AbortError") return;
    document.dispatchEvent(new CustomEvent("show-board-error"));
  }
}

document.addEventListener("retry-board-api", fetchPuzzle);

const customBtn = createElement(
  "button",
  {
    id: "custom-btn",
    className: "action-btn",
  },
  [
    createElement("i", { className: "ph-fill ph-note-pencil" }),
    createElement("p", { textContent: "Custom" }),
  ]
);
customBtn.addEventListener("click", () => {
  window.location.hash = "#custom";
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
  window.location.hash = "#settings";
});

contentDiv.append(playBtn, customBtn);
//#endregion content

homePanel.append(panelBar, contentDiv);

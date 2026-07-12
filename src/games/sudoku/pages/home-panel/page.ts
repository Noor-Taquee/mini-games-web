import "./home-panel.css";

import { createElement } from "../../utils/create-dom.js";
import { changeHash } from "../../utils/event";

import { createActionBtn } from "../../../../components/action-btn/script";
import { createToggleBtn } from "../../../../components/toggle-btn/script";

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

const accountBtn = createToggleBtn("ph-bold ph-user");
accountBtn.title = "Settings";
accountBtn.id = "settings-btn";

panelBar.append(gameName, accountBtn);
//#endregion panel bar

//#region content
const panelContent = createElement("div", {
  className: "panel-content",
});

const playBtn = createActionBtn("ph-fill ph-play", "Play", {
  size: "large",
  center: "x",
});

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

    changeHash(
      `playing&puzzle=${sourcePuzzle}&difficulty=${source.difficulty}`
    );
  } catch (er: unknown) {
    if (er instanceof Error && er.name == "AbortError") return;
    document.dispatchEvent(new CustomEvent("show-board-error"));
  }
}

document.addEventListener("retry-board-api", fetchPuzzle);

const customBtn = createActionBtn("ph-fill ph-note-pencil", "Custom", {
  size: "large",
  center: "x",
});
customBtn.addEventListener("click", () => changeHash("custom"));

const settingsBtn = createActionBtn("ph-fill ph-gear", "Settings", {
  size: "large",
  center: "x",
});
settingsBtn.addEventListener("click", () => changeHash("settings"));

panelContent.append(playBtn, customBtn);
//#endregion content

homePanel.append(panelBar, panelContent);

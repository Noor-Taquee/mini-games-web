import "./style.css";

import { createGameCard } from "../../components/game-card/script";
import { createElement } from "../../utils/create-dom";
import { createToggleBtn } from "../../components/toggle-btn/script";

export const panel = createElement("div", {
  className: "app-panel",
  id: "home-panel",
});

//#region bar
const panelBar = createElement("div", {
  className: "panel-bar",
  id: "home-panel-bar",
});

const panelNameDiv = createElement("div", {
  className: "panel-name-div",
  id: "home-panel-name-div",
});

const panelName = createElement("span", {
  className: "panel-name",
  id: "home-panel-name",
  textContent: "Mini Games Web",
});

panelNameDiv.appendChild(panelName);

const utilityDiv = createElement("div", {
  className: "utility-div",
  id: "home-utility-div",
});

const settingsBtn = createToggleBtn("ph-bold ph-gear-fine");

utilityDiv.appendChild(settingsBtn);

panelBar.append(panelNameDiv, utilityDiv);
//#endregion bar

//#region content
const panelContent = createElement("div", {
  className: "panel-content",
  id: "home-panel-content",
});

const searchBar = createElement("input", {
  name: "search",
  type: "text",
  placeholder: "Search",
  className: "search-bar",
  id: "home-search-bar",
});

const container = createElement("div", {
  className: "",
  id: "game-container",
});

const gameData: Record<
  string,
  { name: string; description: string; url: string }
> = {
  sudoku: {
    name: "Sudoku",
    description: "A classic number puzzle game.",
    url: "sudoku/",
  },
  "tic-tac-toe": {
    name: "Tic-Tac-Toe",
    description: "A classic game of Xs and Os.",
    url: "tic-tac-toe/",
  },
  wordle: {
    name: "Wordle",
    description: "A classic word guessing game.",
    url: "wordle/",
  },
};

for (const pair of Object.entries(gameData)) {
  const value = pair[1];
  const gameBtn = createGameCard(value.name, value.description, value.url);
  container.appendChild(gameBtn);
}

panelContent.append(searchBar, container);
//#endregion content

panel.append(panelBar, panelContent);

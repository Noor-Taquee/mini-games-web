import "./playing-panel.css";

import { createElement } from "../../utils/create-dom.js";
import { changeHash } from "../../utils/event.js";

import { gameState } from "../../core/handler.js";

export const playingPanel = createElement("div", {
  id: "playing-panel",
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
const panelName = createElement("p", {
  className: "panel-name",
  textContent: "tic-tac-toe",
});
panelNameDiv.append(backBtn, panelName);

backBtn.addEventListener("click", () => {
  changeHash("home");
});

const utilityDiv = createElement("div", {
  className: "utility-div",
});

const undoBtn = createElement(
  "button",
  {
    title: "Undo",
    className: "toggle-btn",
  },
  [createElement("i", { className: "ph-bold ph-arrow-arc-left" })]
);
undoBtn.addEventListener("click", () => {
  if (!gameState.boardState || gameState.boardState.history.length <= 0) return;

  const box = playingBox.querySelector<HTMLDivElement>(
    `#${gameState.boardState.history.pop()}`
  );
  if (!box) return;
  emptyBox(box);
  gameState.boardState.swapSign();
});

const replayBtn = createElement(
  "button",
  {
    title: "Reset",
    className: "toggle-btn",
  },
  [createElement("i", { className: "ph-bold ph-arrow-counter-clockwise" })]
);
replayBtn.addEventListener("click", () => {
  document.dispatchEvent(new Event("reset-game"));
});

utilityDiv.append(undoBtn, replayBtn);

panelBar.append(panelNameDiv, utilityDiv);
//#endregion panel Bar

//#region content
const panelContent = createElement("div", {
  className: "panel-content",
});

export const playingBox = createElement("div", {
  id: "playing-box",
});

const boxes: HTMLDivElement[] = [];

for (let i = 0; i < 9; i++) {
  const box = createElement("div", {
    id: `box-${i}`,
    className: "box",
  });

  box.addEventListener("click", () => {
    if (!gameState.boardState || box.hasChildNodes()) return;

    gameState.boardState.history.push(box.id);

    const icon = document.createElement("i");
    icon.className = `ph-bold ph-${gameState.boardState.currentSign} icon expand`;
    icon.addEventListener("animationend", () => {
      icon.classList.remove("expand");
    });
    box.appendChild(icon);
    gameState.boardState.swapSign();
  });

  boxes.push(box);
  playingBox.appendChild(box);
}

function emptyBox(box: HTMLDivElement, delay = 0) {
  const icon = box.querySelector("i");
  if (!icon) return;

  icon.classList.add("disappear");
  icon.style.animationDelay = `${delay}ms`;
  icon.addEventListener(
    "animationend",
    () => {
      box.innerHTML = "";
      icon.style.animationDelay = "0";
      icon.classList.remove("disappear");
    },
    { once: true }
  );
}

function resetBoard() {
  let delay = 0;
  boxes.forEach((box) => {
    emptyBox(box, delay);
    delay += 50;
  });
}

function resetBoard2() {
  if (!gameState.boardState) return;

  let delay = 0;
  gameState.boardState.history.forEach((id) => {
    const box = playingBox.querySelector<HTMLDivElement>(`#${id}`);
    if (!box) return;
    emptyBox(box, delay);
    delay += 100;
  });
}

panelContent.append(playingBox);
//#endregion content

playingPanel.append(panelBar, panelContent);

document.addEventListener("reset-game", () => {
  if (!gameState.boardState) return;

  resetBoard2();
  gameState.boardState.history = [];
  gameState.boardState.currentSign = "x";
});

document.addEventListener("new-game", () => {
  resetBoard();
});

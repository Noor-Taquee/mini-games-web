import "./playing-panel.css";

import { createElement } from "../../utils/create-dom.js";
import { changeHash, eventBus } from "../../utils/event.js";

import { createActionBtn } from "../../../../components/action-btn/script";
import { createToggleBtn } from "../../../../components/toggle-btn/script";
import { numpad } from "../../components/numpad/numpad.js";

import {
  calculateProgress,
  createSourceBoard,
  createBoard,
  gameState,
  showBoard,
} from "../../core/sudoku.js";
import { solveSudoku } from "../../services/solver.js";

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
const backBtn = createToggleBtn("ph-bold ph-caret-left");
backBtn.title = "Back";
const gameName = createElement("p", {
  className: "panel-name",
  textContent: "sudoku",
});
panelNameDiv.append(backBtn, gameName);

backBtn.addEventListener("click", () => changeHash("home"));

const timerDiv = createElement("div", {
  className: "timer-div",
});

const timeP = createElement("p", {
  textContent: "0:00.0",
});
//   const minuteP = createElement("span", {
//     textContent: "0"
//   });
//   const minSecD = createElement("span", {
//     textContent: ":"
//   });
//   const secondP = createElement("span", {
//     textContent: "00"
//   });
//   const secMillD = createElement("span", {
//     textContent: "."
//   });
//   const milliSecondP = createElement("span", {
//     textContent: "0"
//   });
// timeP.append( minuteP, minSecD, secondP, secMillD, milliSecondP );

const timerIcon = createElement("i", {
  className: "ph-bold ph-timer",
});

timerDiv.append(timeP, timerIcon);

//#region Timer
let startTime: number;
let timerInterval: number;

function resetTimer() {
  stopTimer();
  // minuteP.textContent = "0";
  // secondP.textContent = "00";
  // milliSecondP.textContent = "0";
  timeP.textContent = "0:00.0";
}

function startTimer() {
  clearInterval(timerInterval);

  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    const tenths = Math.floor((elapsed % 1000) / 100);

    timeP.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}.${tenths}`;
    // minuteP.textContent = String(minutes);
    // secondP.textContent = seconds.toString().padStart(2, '0');
    // milliSecondP.textContent = String(tenths);
  }, 100);
}

function stopTimer() {
  clearInterval(timerInterval);
}

eventBus.addEventListener("game-started", startTimer);
//#endregion Timer

panelBar.append(panelNameDiv, timerDiv);
//#endregion panel Bar

//#region content
const panelContent = createElement("div", {
  className: "panel-content",
});

export const boardContainer = createElement("div", { id: "board-container" });

const infoDiv = createElement("div", {
  id: "info-div",
  className: "",
});

const difficultyTextDiv = createElement("div", {
  className: "info-text-div",
});
const difficultyKey = createElement("span", {
  className: "info key",
  textContent: "Difficulty: ",
});
const difficultyValue = createElement("span", {
  className: "info value",
  textContent: "",
});
difficultyTextDiv.append(difficultyKey, difficultyValue);

const progressDiv = createElement("div", {
  className: "content",
});
const progressHeaderDiv = createElement("div", {
  className: "top-bar",
});
progressHeaderDiv.style.padding = String(0);
const progressHeaderText = createElement("p", {
  className: "header-text info",
  textContent: "Boxes filled",
});
const progressNumber = createElement("p", {
  className: "progress-number info",
  textContent: "0/81",
});
progressHeaderDiv.append(progressHeaderText, progressNumber);

const progressBar = createElement(
  "div",
  {
    className: "progress",
  },
  [createElement("div", { className: "progress-fill" })]
);

progressDiv.append(progressHeaderDiv, progressBar);

function setProgress(value: number, max = 81) {
  progressBar.style.setProperty("--value", `${(value * 100) / max}%`);
  progressNumber.textContent = `${value}/${max}`;
}

eventBus.addEventListener("game-progress", (e) => {
  setProgress((e as CustomEvent).detail.progress);
});

infoDiv.append(difficultyTextDiv, progressDiv);

const startBtn = createActionBtn("ph-fill ph-play", "start", {
  size: "large",
  center: "both",
});

startBtn.addEventListener("click", () => {
  if (!showBoard()) return;
  panelContent.replaceChild(numpad, startBtn);

  requestAnimationFrame(() => {
    numpad.classList.add("anim-slide-in-bottom");
    numpad.addEventListener(
      "animationend",
      () => {
        numpad.classList.remove("anim-slide-in-bottom");
      },
      { once: true }
    );
  });
});

panelContent.append(boardContainer, infoDiv, startBtn);
//#endregion content

playingPanel.append(panelBar, panelContent);

// MARK: Prepare Board
export function prepareBoard() {
  clearBoard();
  if (!window.location.hash.startsWith("#sudoku/playing")) {
    changeHash("playing");
  }

  boardContainer.classList.add("scan-loading");
  difficultyValue.classList.add("scan-loading");
  startBtn.innerHTML = "";
  startBtn.append(
    createElement("i", { className: "ph-bold ph-circle-notch spin" }),
    createElement("p", { textContent: "loading" })
  );
}
eventBus.addEventListener("prepare-board", prepareBoard);

// MARK: Start New Game
export function renderBoard() {
  clearBoard();

  boardContainer.classList.remove("scan-loading");
  difficultyValue.classList.remove("scan-loading");
  startBtn.innerHTML = "";
  startBtn.append(
    createElement("i", { className: "ph-fill ph-play" }),
    createElement("p", { textContent: "start" })
  );
  boardContainer.appendChild(createBoard()!);
  difficultyValue.textContent = gameState.boardState?.difficulty ?? null;
  calculateProgress();
}
eventBus.addEventListener("render-board", renderBoard);

// MARK: Clear Board
export function clearBoard() {
  boardContainer.classList.remove("load-error");
  resetTimer();
  if (panelContent.contains(numpad)) {
    panelContent.replaceChild(startBtn, numpad);
  }
  difficultyValue.textContent = "";
  boardContainer.innerHTML = "";
  setProgress(0);
}
eventBus.addEventListener("clear-board", clearBoard);

// MARK: Reset Board
export function resetBoard() {
  clearBoard();
  renderBoard();
}
eventBus.addEventListener("reset-board", resetBoard);

// MARK: Show Error
eventBus.addEventListener("show-board-error", () => {
  difficultyValue.classList.remove("scan-loading");
  boardContainer.classList.remove("scan-loading");
  boardContainer.classList.add("load-error");

  const errorMessage = createElement("p", {
    className: "error-message",
    textContent: "Failed to load",
  });
  boardContainer.append(errorMessage);

  startBtn.innerHTML = "";
  startBtn.append(
    createElement("i", { className: "ph-bold ph-arrow-counter-clockwise" }),
    createElement("p", { textContent: "retry" })
  );
  startBtn.addEventListener(
    "click",
    () => {
      if (!boardContainer.classList.contains("load-error")) return;

      eventBus.dispatchEvent(new Event("retry-board-api"));
    },
    { once: true }
  );
});

//#region hashHandler
export function hashHandler(attr: string[]) {
  let infoPresent = false;

  let puzzle;
  let difficulty;

  attr.forEach((part) => {
    const [key, value] = part.split("=");
    if (key == "puzzle") {
      puzzle = value;
      infoPresent = true;
    } else if (key == "difficulty") {
      difficulty = value;
      infoPresent = true;
    }
  });

  if (!puzzle) {
    if (infoPresent) {
      changeHash("home");
    }
    return;
  }

  const solution = solveSudoku(puzzle);
  if (!solution) {
    eventBus.dispatchEvent(
      new CustomEvent("show-board-error", {
        detail: {
          message: "The puzzle is not valid.",
          retry: false,
        },
      })
    );
    return;
  }
  difficulty = difficulty ? difficulty : "custom";

  gameState.boardState = {
    puzzle: createSourceBoard(puzzle),
    solution: createSourceBoard(solution),
    currentState: createSourceBoard(puzzle),
    difficulty: difficulty,
    mistakes: 0,
    history: [],
  };
  eventBus.dispatchEvent(new Event("render-board"));
}
//#endregion hashHandler

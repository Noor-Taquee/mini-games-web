import { createElement } from "../utils/create-dom.js";

export type BoardData =
  "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | null;
export type BoardBox = [
  BoardData,
  BoardData,
  BoardData,
  BoardData,
  BoardData,
  BoardData,
  BoardData,
  BoardData,
  BoardData,
];
export type SourceBoard = [
  BoardBox,
  BoardBox,
  BoardBox,
  BoardBox,
  BoardBox,
  BoardBox,
  BoardBox,
  BoardBox,
  BoardBox,
];

type Position = {
  box: string;
  row: string;
  col: string;
};

export type BoardState = {
  puzzle: SourceBoard;
  solution: SourceBoard;
  currentState: SourceBoard;
  difficulty: string;
  mistakes: number;
  history: { data: string; position: Position }[];
};

export const gameState: {
  boardState: BoardState | null;
} = {
  boardState: null,
};

/** Creates board source data from string. */
export function createSourceBoard(sourceString: string) {
  const boxes: BoardBox[] = Array.from(
    { length: 9 },
    () => [] as unknown as BoardBox,
  );

  for (let i = 0; i < 81; i++) {
    const char = sourceString[i];
    const val = char === "." || char === "0" ? null : (char as BoardData);

    // Calculate Row and Column in a 9x9 grid
    const row = Math.floor(i / 9);
    const col = i % 9;

    // Map 9x9 coordinates to the 3x3 Box index (0-8)
    const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);

    // Add value to the correct box
    (boxes[boxIndex] as BoardData[]).push(val);
  }

  return boxes as SourceBoard;
}

//#region UI

export function createBoard(): HTMLDivElement | undefined {
  if (!gameState.boardState) return;

  const board = createElement("div", {
    id: "current-board",
    className: "board locked",
  });

  gameState.boardState.currentState.forEach((boardBox, boxI) => {
    const boxNum = boxI + 1;
    const boxRow = Math.ceil(boxNum / 3);
    const boxCol = boxNum % 3 || 3;

    const box = createElement("div", {
      className: "board-box",
    });

    boardBox.forEach((data, dataI) => {
      const dataNum = dataI + 1;
      const dataRow = Math.ceil(dataNum / 3);
      const globalRow = dataRow + boxRow * 3 - 3;
      const dataCol = dataNum % 3 || 3;
      const globalCol = dataCol + boxCol * 3 - 3;

      const entry = createElement(
        "div",
        {
          className: `board-entry box-${boxNum} row-${globalRow} col-${globalCol} ${data ? "read-only" : ""}`,
        },
        [
          createElement("span", {
            textContent: String(data ? data : ""),
          }),
        ],
      );
      entry.dataset.box = String(boxNum);
      entry.dataset.row = String(globalRow);
      entry.dataset.col = String(globalCol);
      entry.addEventListener("click", () => {
        changeFocusTo(globalRow, globalCol);
      });

      box.appendChild(entry);
    });

    board.appendChild(box);
  });

  return board;
}

export function showBoard(): boolean {
  const board = document.getElementById("current-board");
  if (!board) return false;

  const boardEntry = board.querySelector<HTMLDivElement>(
    ".board-entry.read-only",
  );
  board.classList.add("revealing-first-half");
  boardEntry?.addEventListener(
    "animationend",
    () => {
      board.classList.remove("revealing-first-half");

      board.classList.remove("locked");

      board.classList.add("revealing-second-half");
      boardEntry.addEventListener(
        "animationend",
        () => {
          board.classList.remove("revealing-second-half");
          document.dispatchEvent(new Event("game-started"));
        },
        { once: true },
      );
    },
    { once: true },
  );

  return true;
}

/** Highlits all the entries in the impact zone of `entry` */
export function highlightImpact(entry: HTMLDivElement) {
  const position = getPosition(entry);
  if (!position) return;
  const board = document.getElementById("current-board") as HTMLDivElement;
  board
    ?.querySelectorAll<HTMLDivElement>(
      `.box-${position.box}, .row-${position.row}, .col-${position.col}`,
    )
    .forEach((div) => {
      div.classList.add("impact");
    });
}

/**  */
export function removeImpact() {
  const board = document.getElementById("current-board") as HTMLDivElement;
  board?.querySelectorAll<HTMLDivElement>(".impact").forEach((div) => {
    div.classList.remove("impact");
  });
}

/** Changes focus to given position of entry. */
export function changeFocusTo(row: number, col: number, addImpact = true) {
  removeImpact();

  const board = document.getElementById("current-board") as HTMLDivElement;
  board?.querySelectorAll<HTMLDivElement>(".focused").forEach((element) => {
    element.classList.remove("focused");
  });

  const focusedBox = board.querySelector<HTMLDivElement>(
    `.board-entry.row-${row}.col-${col}`,
  );
  if (!focusedBox) return;
  focusedBox.classList.add("focused");

  checkEntry(focusedBox, false);
  if (addImpact) highlightImpact(focusedBox);
}

export function moveFocus(direction: "u" | "d" | "l" | "r", mag = 1) {
  const board = document.getElementById("current-board") as HTMLDivElement;
  const focused = board?.querySelector<HTMLDivElement>(".focused");
  if (!focused) {
    changeFocusTo(1, 1);
    return;
  }

  const position = getPosition(focused);
  if (!position) return;

  let row = Number(position.row);
  let col = Number(position.col);

  if (direction === "u") row = Math.max(1, row - mag);
  if (direction === "d") row = Math.min(9, row + mag);
  if (direction === "l") col = Math.max(1, col - mag);
  if (direction === "r") col = Math.min(9, col + mag);

  changeFocusTo(row, col);
}
//#endregion UI

//#region Logic

export function getPosition(entry: HTMLDivElement): Position | undefined {
  if (!entry.classList.contains("board-entry")) return;

  return {
    box: entry.dataset.box!,
    row: entry.dataset.row!,
    col: entry.dataset.col!,
  };
}

/** Adds value to the entry and changes to progress. Validates the entry by default. */
export function addEntry(num: string, validate = true) {
  if (!gameState.boardState) return;

  const board = document.getElementById("current-board") as HTMLDivElement;

  board.querySelectorAll<HTMLDivElement>(".focused").forEach((entry) => {
    if (entry.classList.contains("read-only")) return;

    const span = entry.querySelector("span");
    if (!span) return;
    span.textContent = num;

    const position = getPosition(entry);
    if (!position) return;

    gameState.boardState!.currentState[Number(position.box) - 1]![
      3 * Number(position.row) + Number(position.col) - 4
    ] = num as BoardData;

    if (validate) checkEntry(entry);
  });
}

/** Checks if the entry is valid. `force` = true, forces it to check the impact zone even if the entry is empty. */
export function checkEntry(entry: HTMLDivElement, force = true) {
  if (!gameState) return;

  if (entry.classList.contains("read-only")) return;

  const position = getPosition(entry);
  if (!position) return;

  let wrong = false;

  const span = entry.querySelector("span");
  if (!span) return;
  if (!force && !span.textContent) return;

  const board = document.getElementById("current-board") as HTMLDivElement;
  const impactZone = board.querySelectorAll<HTMLDivElement>(
    `.box-${position.box}, .row-${position.row}, .col-${position.col}`,
  );
  impactZone.forEach((impactEntry) => {
    if (impactEntry == entry) return;
    const impactSpan = impactEntry.querySelector("span");
    if (!impactSpan) return;
    if (span.textContent == impactSpan.textContent && span.textContent) {
      wrong = true;
      impactEntry.classList.add("wrong");
    } else {
      impactEntry.classList.remove("wrong");
    }
  });

  if (wrong) {
    entry.classList.add("wrong");
  } else {
    entry.classList.remove("wrong");
  }
}

export function removeEntry() {
  addEntry("");
}

export function calculateProgress(show = true) {
  let progress = 0;
  gameState.boardState?.currentState.flat().forEach((i) => {
    progress += i && Number(i) ? 1 : 0;
  });

  if (show) showProgress(progress);

  return progress;
}

function showProgress(progress: number) {
  document.dispatchEvent(
    new CustomEvent("game-progress", {
      detail: {
        progress: progress,
      },
    }),
  );
}

//#endregion Logic

document.addEventListener("keydown", (e) => {
  if (e.key >= "1" && e.key <= "9") {
    addEntry(e.key);
  } else if (e.key === "Backspace" || e.key === "Delete") {
    removeEntry();
  } else if (e.key.startsWith("Arrow")) {
    e.preventDefault();
    const dirMap: Record<string, "u" | "d" | "l" | "r"> = {
      ArrowUp: "u",
      ArrowDown: "d",
      ArrowLeft: "l",
      ArrowRight: "r",
    };
    moveFocus(dirMap[e.key]!);
  }
});

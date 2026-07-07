import { checkWord } from "../services/checkWord.js";
import { createElement } from "../utils/create-dom.js";

export const gameState = {
  /** 1 based indexing */
  playerCurrentPosition: {
    row: 1,
    col: 1,
  },

  /** Current state of attempt panel. */
  attemptPanel: [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ],
  puzzleWord: "place",
  puzzleWordLength: 5,

  attempts: 6,
};

export const attemptBoxFrame = createElement("div", {
  id: "playing-box-container",
});

/** Recreates the area for guess attempts */
function createAttemptPanel() {
  const container = attemptBoxFrame;
  container.innerHTML = "";

  for (let row = 1; row <= gameState.attempts; row++) {
    const attemptRow = createElement("div", {
      id: `row-${row}`,
      className: "attempt-row",
    });

    for (let column = 1; column <= gameState.puzzleWordLength; column++) {
      const attemptBox = createElement(
        "div",
        {
          id: `box-${column}`,
          className: `attempt-box col-${column}`,
        },
        [createElement("p")],
      );

      attemptBox.dataset.row = String(row);
      attemptBox.dataset.col = String(column);

      attemptRow.appendChild(attemptBox);
    }

    container.appendChild(attemptRow);
  }

  const box = container.querySelector(
    `#row-${gameState.playerCurrentPosition.row} #box-${gameState.playerCurrentPosition.col}`,
  );
  box?.classList.add("selected");
}

/** Fills `letter` in the `selectedBox`. Overwrites any text written in it.
 * By default it changes the focus.
 */
function addEntry(letter: string, changeFocus = true) {
  attemptBoxFrame
    .querySelectorAll<HTMLDivElement>(".selected")
    .forEach((box) => {
      const p = box.querySelector("p");
      if (!p) return;
      p.textContent = letter;
      gameState.attemptPanel[gameState.playerCurrentPosition.row - 1]![
        gameState.playerCurrentPosition.col - 1
      ] = letter;
    });

  if (changeFocus) moveFocus(1);
}

/** Empties any textContent inside `selectedBox` */
function removeEntry() {
  attemptBoxFrame
    .querySelectorAll<HTMLDivElement>(".selected")
    .forEach((box) => {
      const p = box.querySelector("p");
      if (!p) return;
      if (p.textContent.length < 1) {
        moveFocus(-1);
        return;
      }

      p.textContent = "";
      gameState.attemptPanel[gameState.playerCurrentPosition.row - 1]![
        gameState.playerCurrentPosition.col - 1
      ] = "";
    });
}

/** changes the focused box */
function moveFocus(direction: number) {
  attemptBoxFrame.querySelectorAll(".selected").forEach((box) => {
    box.classList.remove("selected");
  });

  if (direction > 0) {
    if (
      gameState.playerCurrentPosition.col <=
      gameState.puzzleWordLength - direction
    ) {
      gameState.playerCurrentPosition.col += direction;
    }
  } else {
    if (gameState.playerCurrentPosition.col > 1) {
      gameState.playerCurrentPosition.col--;
    }
  }

  const box = attemptBoxFrame.querySelector(
    `#row-${gameState.playerCurrentPosition.row} #box-${gameState.playerCurrentPosition.col}`,
  );
  box?.classList.add("selected");
}

async function handleEnter(row = gameState.playerCurrentPosition.row) {
  const rowState = gameState.attemptPanel[row - 1];
  if (!rowState) return;

  // Check for incomplete word.
  for (const letter of rowState) {
    if (!letter || letter.length < 1) {
      return;
    }
  }

  // Check for a valid word.
  const word = rowState.join("");
  const isWord = await checkWord(word);
  if (!isWord) {
    console.log("Not a word.");
    return;
  }

  for (let i = 0; i < gameState.puzzleWordLength; i++) {
    let report: string;

    if (gameState.puzzleWord[i] == rowState[i]) {
      report = "correct";
    } else if (gameState.puzzleWord.includes(rowState[i]!)) {
      report = "present";
    } else {
      report = "wrong";
    }

    document.dispatchEvent(
      new CustomEvent("entry-report", {
        detail: {
          report: report,
          position: {
            row: row,
            col: i + 1,
          },
        },
      }),
    );
  }

  gameState.playerCurrentPosition.row++;
  gameState.playerCurrentPosition.col = 1;
  moveFocus(0);
}

document.addEventListener("entry-report", (ev) => {
  const e = ev as CustomEvent<{
    report: string;
    position: {
      row: number;
      col: number;
    };
  }>;

  const row = attemptBoxFrame.querySelector(`#row-${e.detail.position.row}`);
  if (!row) return;

  const box = row.querySelector<HTMLDivElement>(
    `.col-${e.detail.position.col}`,
  );
  if (!box) return;

  const delay = `${(e.detail.position.col - 1) * 50}ms`;

  box.classList.add("flip-first-half");
  box.style.animationDelay = delay;
  box.addEventListener(
    "animationend",
    () => {
      box.classList.remove("flip-first-half");

      box.classList.add(e.detail.report);

      box.classList.add("flip-second-half");
      box.addEventListener(
        "animationend",
        () => {
          box.style.animationDelay = "0ms";
          box.classList.remove("flip-second-half");
        },
        { once: true },
      );
    },
    { once: true },
  );
});

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  const keypress = event.key.toLowerCase();
  if (keypress.length == 1 && keypress >= "a" && keypress <= "z") {
    addEntry(keypress);
  } else if (event.key === "Backspace") {
    removeEntry();
  } else if (event.key === "Enter") {
    handleEnter();
  } else if (event.key == "ArrowLeft") {
    moveFocus(-1);
  } else if (event.key == "ArrowRight") {
    moveFocus(1);
  }
});

document.addEventListener("delete-letter", () => {
  removeEntry();
});

document.addEventListener("enter-attempt", () => {
  handleEnter();
});

document.addEventListener("new-game", () => {
  createAttemptPanel();
});

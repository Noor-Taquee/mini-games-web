
export type BoardState = {
  currentState: string[][];
  currentSign: "x"|"circle";
  history: string[];
  swapSign: () => void,
}

type GameState = {
  boardState: BoardState|null;
}

export const gameState: GameState = {
  boardState: null,
}


document.addEventListener("new-game", () => {
  gameState.boardState = {
    currentState: [
      ["","",""],
      ["","",""],
      ["","",""]
    ],
    currentSign: "x",
    history: [],
    swapSign: swapSign,
  }
});

function swapSign() {
  if (!gameState.boardState) return;
  gameState.boardState.currentSign = gameState.boardState.currentSign == "x" ? "circle" : "x";
}
/**
 * Optimized Sudoku Solver using Bitmasking.
 * Returns an 81-char string solution or null if unsolvable.
 */
export function solveSudoku(input: string): string | null {
  const board = input
    .split("")
    .map((c) => (c === "." || c === "0" ? 0 : parseInt(c)));
  const rows = new Array(9).fill(0);
  const cols = new Array(9).fill(0);
  const boxes = new Array(9).fill(0);

  // Initialize masks
  for (let i = 0; i < 81; i++) {
    if (board[i] !== 0) {
      const val = 1 << board[i]!;
      const r = Math.floor(i / 9),
        c = i % 9,
        b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      if (rows[r] & val || cols[c] & val || boxes[b] & val) return null; // Invalid input
      rows[r] |= val;
      cols[c] |= val;
      boxes[b] |= val;
    }
  }

  function backtrack(index: number): boolean {
    if (index === 81) return true;
    if (board[index] !== 0) return backtrack(index + 1);

    const r = Math.floor(index / 9),
      c = index % 9,
      b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
    const used = rows[r] | cols[c] | boxes[b];

    for (let num = 1; num <= 9; num++) {
      const val = 1 << num;
      if (!(used & val)) {
        board[index] = num;
        rows[r] |= val;
        cols[c] |= val;
        boxes[b] |= val;
        if (backtrack(index + 1)) return true;
        // Undo
        board[index] = 0;
        rows[r] &= ~val;
        cols[c] &= ~val;
        boxes[b] &= ~val;
      }
    }
    return false;
  }

  return backtrack(0) ? board.join("") : null;
}

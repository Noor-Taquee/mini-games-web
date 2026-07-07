export const dosukuApi = "https://sudoku-api.vercel.app/api/dosuku";

export type DosukuData = {
  newboard: {
    grids: {
      value: number[][];
      solution: number[][];
      difficulty: "Hard" | "Medium" | "Easy";
    }[];
    result: number;
    message: "All ok" | string;
  };
};

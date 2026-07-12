import { app } from "../app";

export function changeHash(newHash: string) {
  window.location.hash = `#sudoku/${newHash}`;
}

export function changeRoute(newRoute: string): void {
  const event = new CustomEvent("sudoku-route-change", {
    detail: newRoute,
  });
  app.dispatchEvent(event);
}

export const eventBus = new EventTarget();

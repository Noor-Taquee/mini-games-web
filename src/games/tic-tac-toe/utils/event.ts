import { app } from "../app";

export function changeHash(newHash: string) {
  window.location.hash = `#tic-tac-toe/${newHash}`;
}

export function changeRoute(newRoute: string): void {
  const event = new CustomEvent("tictactoe-route-change", {
    detail: newRoute,
  });
  app.dispatchEvent(event);
}

export const eventBus = new EventTarget();

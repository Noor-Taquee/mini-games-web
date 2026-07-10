import { app } from "../app";

export function changeHash(newHash: string) {
  window.location.hash = `#tictactoe/${newHash}`;
}

export function changeRoute(newRoute: string): void {
  const event = new CustomEvent("tictactoe-route-change", {
    detail: newRoute,
  });
  app.dispatchEvent(event);
}

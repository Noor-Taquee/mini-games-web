import { app } from "../app";

export function changeHash(newHash: string) {
  window.location.hash = `#wordle/${newHash}`;
}

export function changeRoute(newRoute: string): void {
  const event = new CustomEvent("wordle-route-change", {
    detail: newRoute,
  });
  app.dispatchEvent(event);
}

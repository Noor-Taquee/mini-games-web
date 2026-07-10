import { app } from "../app";

export function changeHash(newHash: string) {
  window.location.hash = `#${newHash}`;
}

export function changeRoute(newRoute: string): void {
  const event = new CustomEvent("app-route-change", {
    detail: newRoute,
  });
  app.dispatchEvent(event);
}

import { changeHash } from "./utils/event.js";

import { panelContainer } from "./app";

import { panel as homePanel } from "./pages/home-page/script";

import {
  app as sudokuPanel,
  mainRoute as sudokuRoute,
} from "./games/sudoku/main.js";

import {
  app as wordlePanel,
  mainRoute as wordleRoute,
} from "./games/wordle/main.js";

import {
  app as ticTacToePanel,
  mainRoute as ticTacToeRoute,
} from "./games/tic-tac-toe/main.js";

type HashHandler = (attr: string[]) => void;

type RouteInfo = [HTMLDivElement, (Route | null)?, HashHandler?];

type Route = Record<string, RouteInfo>;

const homeRoute: Route = {
  "": [homePanel],
};

const mainRoute: Route = {
  "": [homePanel, homeRoute],
  home: [homePanel, homeRoute],
  sudoku: [sudokuPanel, sudokuRoute],
  wordle: [wordlePanel, wordleRoute],
  "tic-tac-toe": [ticTacToePanel, ticTacToeRoute],
};

function defaultHash() {
  changeHash("home");
}

function handle(hash: string) {
  if (hash.startsWith("#")) {
    hash = hash.substring(1);
  }

  const hashParts = hash.split("&");

  const locationHash = hashParts[0] ?? "";

  const response = handleLocaton(locationHash);

  if (!response) {
    defaultHash();
    return;
  }

  showPanel(response.targetPanel);

  if (!response.hashHandler) return;

  const attributesHash = hashParts.slice(1);
  if (attributesHash.length >= 1) response.hashHandler(attributesHash);
}

/**
 * Handles the location hash and routes the user to the appropriate panel.
 * The panel & hash handler associated with the last path segment is returned.
 * @param locationString - The location string to handle. values separated by `/`.
 * Uses the parent route to resolve the next path segment.
 * Does this recursively to reach the required depth.
 * Once the last path segment is reached, the panel & hash handler are returned.
 */
function handleLocaton(locationString: string) {
  const locationStack = locationString.split("/");

  /** The current route being resolved. */
  let parentRoute: Route | undefined | null = mainRoute;

  for (const [index, path] of locationStack.entries()) {
    if (!parentRoute) return;

    const routeInfo: RouteInfo | undefined = parentRoute[path];

    if (!routeInfo) return;

    parentRoute = routeInfo[1];

    if (index == locationStack.length - 1) {
      return {
        targetPanel: routeInfo[0],
        hashHandler: routeInfo[2],
      };
    }
  }
}

function showPanel(newPanel: HTMLDivElement, animation = true) {
  if (panelContainer.firstChild)
    panelContainer.removeChild(panelContainer.firstChild);
  panelContainer.appendChild(newPanel);
  if (animation) return;
}

window.addEventListener("hashchange", () => handle(window.location.hash));
window.addEventListener("load", () => handle(window.location.hash));

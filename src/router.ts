import { changeHash } from "./utils/event.js";

import { panelContainer } from "./app";

import { panel as homePanel } from "./pages/home-page/script";

import {
  app as sudokuPanel,
  hashHandler as sudokuHashHandler,
} from "./games/sudoku/main.js";

import {
  app as wordlePanel,
  hashHandler as wordleHashHandler,
} from "./games/wordle/main.js";

import {
  app as ticTacToePanel,
  hashHandler as ticTacToeHashHandler,
} from "./games/tic-tac-toe/main.js";

type ImportedHashHandler = (attr: string) => void;
type ImportedRoute = Record<string, [HTMLDivElement, ImportedHashHandler?]>;

type HashHandler = (attr: string[]) => void;

type Route = Record<
  string,
  [HTMLDivElement, (Route | null)?, hashHandler?: HashHandler]
>;

const homeRoute: Route = {
  "": [homePanel],
};

const mainRoute: Route = {
  "": [homePanel, homeRoute],
  home: [homePanel, homeRoute],
};

const importedRoute: ImportedRoute = {
  sudoku: [sudokuPanel, sudokuHashHandler],
  wordle: [wordlePanel, wordleHashHandler],
  "tic-tac-toe": [ticTacToePanel, ticTacToeHashHandler],
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

  const fun = handleLocaton(locationHash);

  if (!fun) return;

  const attributesHash = hashParts.slice(1);
  if (attributesHash.length >= 1) fun(attributesHash);
}

function handleLocaton(locationString: string) {
  let resolved = false;

  let fun: undefined | null | HashHandler;

  if (locationString.length == 0) {
    defaultHash();
    return;
  }

  const location = locationString.split("/");

  let parentRoute: Route | undefined | null = mainRoute;

  location.forEach((path, index) => {
    if (resolved || !parentRoute) return;

    const lce = parentRoute[path];

    if (!lce) {
      if (index == 0) {
        const info = importedRoute[path];
        if (info) {
          showPanel(info[0]);

          const newPath = location.slice(1).join("/") || "home";
          const handler = info[1];
          if (handler) handler(newPath);

          resolved = true;
          return;
        }
      }

      defaultHash();
      return;
    }

    parentRoute = lce[1];
    const currentPanel = lce[0];
    if (index == 0) {
      fun = lce[2];
    }
    if (index == location.length - 1) {
      showPanel(currentPanel);
    }
  });

  return fun;
}

function showPanel(newPanel: HTMLDivElement, animation = true) {
  if (panelContainer.firstChild)
    panelContainer.removeChild(panelContainer.firstChild);
  panelContainer.appendChild(newPanel);
  if (animation) return;
}

window.addEventListener("hashchange", () => handle(window.location.hash));
window.addEventListener("load", () => handle(window.location.hash));

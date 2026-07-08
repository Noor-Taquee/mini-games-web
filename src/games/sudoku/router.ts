import { homePanel } from "./pages/home-panel/page.js";

import {
  hashHandler as practicalHH,
  playingPanel,
} from "./pages/playing-panel/page.js";

import { customPanel } from "./pages/custom-panel/page.js";

import { settingsPanel } from "./pages/settings-panel/page.js";
import { panelContainer } from "./app.js";

type HashHandler = (attr: string[]) => void;
type Route = Record<string, [HTMLDivElement, (Route | null)?, HashHandler?]>;

export const mainRoute: Route = {
  "": [homePanel],
  home: [homePanel],
  playing: [playingPanel, null, practicalHH],
  custom: [customPanel],
  settings: [settingsPanel],
};

function defaultHash() {
  window.location.hash = "#sudoku";
}

export function handleLocaton(locationString: string) {
  let hashHandler: undefined | HashHandler;

  if (!locationString) {
    defaultHash();
    return;
  }

  const locationStack = locationString?.split("/");
  let parentRoute: Route | null | undefined = mainRoute;

  locationStack.forEach((path, index) => {
    if (!parentRoute) return;

    const lce = parentRoute[path];
    if (!lce) {
      defaultHash();
      return;
    }

    parentRoute = lce[1];
    const currentPanel = lce[0];

    if (index == 0) {
      hashHandler = lce[2];
    }

    if (index == locationStack.length - 1) {
      showPanel(currentPanel);
    }
  });

  return hashHandler;
}

function showPanel(newPanel: HTMLDivElement, animation = true) {
  if (panelContainer.firstChild)
    panelContainer.removeChild(panelContainer.firstChild);
  panelContainer.appendChild(newPanel);
  if (animation) return;
}

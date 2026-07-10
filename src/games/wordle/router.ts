import { panelContainer } from "./app.js";

import { homePanel } from "./pages/home-page/script.js";

import { playingPanel } from "./pages/playing-page/script.js";
import { changeHash } from "./utils/event.js";

type HashHandler = (attr: string[]) => void;
type Route = Record<string, [HTMLDivElement, Route?, HashHandler?]>;

export const mainRoute: Route = {
  "": [homePanel],
  home: [homePanel],
  playing: [playingPanel],
};

const defaultHash = () => changeHash("home");

export function handleLocaton(locationS: string) {
  if (!locationS) {
    defaultHash();
    return;
  }

  let hashHandler: HashHandler | undefined;
  let parentRoute: Route | undefined = mainRoute;

  const locationStack = locationS.split("/");

  locationStack.forEach((path, index) => {
    if (!parentRoute) return;

    const info = parentRoute[path];
    if (!info) {
      defaultHash();
      return;
    }

    const targetPanel = info[0];
    parentRoute = info[1];

    if (info[2]) hashHandler = info[2];

    if (index == locationStack.length - 1) showPanel(targetPanel);
  });

  return hashHandler;
}

function showPanel(panel: HTMLDivElement, animation = true) {
  if (panelContainer.firstChild)
    panelContainer.removeChild(panelContainer.firstChild);
  panelContainer.appendChild(panel);

  if (animation) return;
}

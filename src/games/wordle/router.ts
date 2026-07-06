import { panelContainer } from "./app.js";

import { homePanel } from "./pages/home-page/script.js";

import { playingPanel } from "./pages/playing-page/script.js";

// import { accountPanel } from "./pages/account-page/page.js";

// import { settingsPanel } from "./pages/settings-panel/page.js";

type HashHandler = (attr: string[]) => void;
type Route = Record<string, [HTMLDivElement, Route?, HashHandler?]>;

const mainRoute: Route = {
  "": [homePanel],
  "#home": [homePanel],
  "#playing": [playingPanel],
};

function defaultHash() {
  window.location.hash = "#home";
}

function handle() {
  const hashParts = window.location.hash.split("&");

  const locationHash = hashParts[0] || "";
  const attributesHash = hashParts.slice(1);

  const hashHandler = handleLocaton(locationHash);

  if (!hashHandler) return;

  hashHandler(attributesHash);
}

function handleLocaton(locationS: string) {
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

window.addEventListener("hashchange", handle);
window.addEventListener("load", handle);

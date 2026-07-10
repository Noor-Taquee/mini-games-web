import { changeHash } from "./utils/event.js";

import { panelContainer } from "./app";

import { panel as homePanel } from "./pages/home-page/script";

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
  "#home": [homePanel, homeRoute],
};

function defaultHash() {
  changeHash("home");
}

function handle() {
  const hashParts = window.location.hash.split("&");
  // [#home/physicspanel, practical=screw_gauge, class=11,]

  const locationHash = hashParts[0] ?? "";
  const attributesHash = hashParts.slice(1);
  const fun: HashHandler | undefined = handleLocaton(locationHash);
  if (!fun) return;
  if (attributesHash.length >= 1) fun(hashParts.slice(1));
  // [ practical=screw_gauge, class=11 ]
}

function handleLocaton(locationString: string) {
  let fun: undefined | HashHandler;
  if (!locationString) {
    defaultHash();
    return;
  }
  // #home/physicspanel

  const location = locationString?.split("/");
  // [#home, physicspanel]
  let parentRoute: Route | undefined | null = mainRoute;

  location.forEach((path, index) => {
    if (!parentRoute) return;

    const lce = parentRoute[path];
    if (!lce) {
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

window.addEventListener("hashchange", handle);
window.addEventListener("load", handle);

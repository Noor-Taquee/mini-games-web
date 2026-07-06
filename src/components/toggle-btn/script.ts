import "./style.css";

import { createElement } from "../../utils/create-dom";

export function createToggleBtn(icon: string) {
  const btn = createElement(
    "button",
    {
      className: "toggle-btn",
    },
    [
      createElement("i", {
        className: icon,
      }),
    ],
  );
  return btn;
}

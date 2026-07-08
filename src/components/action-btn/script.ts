import "./style.css";

import { createElement } from "../../utils/create-dom";

export function createActionBtn(icon: string, text: string) {
  const btn = createElement(
    "button",
    {
      className: "action-btn",
    },
    [
      createElement("i", {
        className: icon,
      }),
      createElement("p", {
        textContent: text,
      }),
    ]
  );
  return btn;
}

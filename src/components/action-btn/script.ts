import "./style.css";

import { createElement } from "../../utils/create-dom";

export function createActionBtn(
  icon: string,
  text: string,
  variant: {
    size: "small" | "large";
    center: "x" | "y" | "both" | null;
  } = {
    size: "small",
    center: null,
  }
) {
  const btn = createElement(
    "button",
    {
      className: `action-btn ${variant.size} ${variant.center ? `center-${variant.center}` : ""}`,
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

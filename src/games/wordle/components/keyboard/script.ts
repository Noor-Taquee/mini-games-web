import "./style.css";

import { createElement } from "../../utils/create-dom.js";

export const keyboard = createElement("div", {
  id: "keyboard",
});

const keysLayout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

keysLayout.forEach((keysRow) => {
  const row = createElement("div", { className: "keyboard-row" });

  keysRow.forEach((label) => {
    const key = createElement(
      "button",
      {
        className: "key",
      },
      [createElement("p", { textContent: label })]
    );
    key.addEventListener("click", () => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: label,
          bubbles: true,
          cancelable: true,
        })
      );
    });

    row.append(key);
  });

  keyboard.append(row);
});

const row = createElement("div", { className: "keyboard-row" });
const deleteBtn = createElement(
  "button",
  {
    className: "key action",
  },
  [createElement("i", { className: "ph-bold ph-backspace" })]
);
deleteBtn.addEventListener("click", () => {
  document.dispatchEvent(new Event("delete-letter"));
});

const enterBtn = createElement(
  "button",
  {
    className: "key action",
  },
  [createElement("i", { className: "ph-bold ph-key-return" })]
);
enterBtn.addEventListener("click", () => {
  document.dispatchEvent(new Event("enter-attempt"));
});

row.append(enterBtn, deleteBtn);
keyboard.append(row);

function resetKeyboard() {
  keyboard.querySelectorAll(".key").forEach((key) => {
    key.className = "key";
  });
}
document.addEventListener("reset-keyboard", resetKeyboard);

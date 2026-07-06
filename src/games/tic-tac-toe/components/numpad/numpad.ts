import "./numpad.css";

import { createElement } from "../../utils/create-dom.js";

export const numpad = createElement("div", {
  id: "numpad"
});

function createNumpadBtn(content: {text?: string, icon?:string}, value = content.text) {
  const btn = createElement("button", {
    className: "numpad-btn num",
  }, [
    content.text ?
    createElement("p", { textContent: content.text }):
    createElement("i", { className: content.icon! })
  ]);
  btn.addEventListener("click", () => {
    document.dispatchEvent(new KeyboardEvent("keydown", {
      key: value!,
      bubbles: true,
      cancelable: true,
    } ));
  });
  return btn;
}

const resetKey = createElement("button", {
  className: "numpad-btn num",
}, [
  createElement("i", { className: "ph-bold ph-arrow-counter-clockwise" })
]);

numpad.append(
  // createNumpadBtn({ icon: "ph-bold ph-arrow-up" }, ""),
  resetKey,
  createNumpadBtn({ icon: "ph-bold ph-arrow-up" }, "ArrowUp"),
  createNumpadBtn({ icon: "ph-bold ph-backspace" }, "Backspace"),
  createNumpadBtn({ text: "1" }),
  createNumpadBtn({ text: "2" }),
  createNumpadBtn({ text: "3" }),
  createNumpadBtn({ text: "4" }),
  createNumpadBtn({ text: "5" }),
  createNumpadBtn({ text: "6" }),
  createNumpadBtn({ text: "7" }),
  createNumpadBtn({ text: "8" }),
  createNumpadBtn({ text: "9" }),
  createNumpadBtn({ icon: "ph-bold ph-arrow-left" }, "ArrowLeft"),
  createNumpadBtn({ icon: "ph-bold ph-arrow-down" }, "ArrowDown"),
  createNumpadBtn({ icon: "ph-bold ph-arrow-right" }, "ArrowRight"),
);
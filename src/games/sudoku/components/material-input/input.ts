export function modifyInputDiv(
  input: HTMLInputElement | HTMLTextAreaElement,
  div: HTMLDivElement
) {
  checkInput(input, div);

  input.addEventListener("focus", () => {
    div.classList.add("selected");
    div.classList.remove("wrong");
  });
  input.addEventListener("input", () => {
    div.classList.add("selected");
    div.classList.remove("wrong");
  });

  input.addEventListener("blur", () => {
    if (input.value.length > 0) return;
    div.classList.remove("selected");
  });
}

export function checkInput(
  input: HTMLInputElement | HTMLTextAreaElement,
  div: HTMLDivElement
) {
  if (input.value.length > 0) div.classList.add("selected");
}

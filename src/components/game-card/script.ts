import "./style.css";

import { createElement } from "../../utils/create-dom";
import { createActionBtn } from "../action-btn/script";

export function createGameCard(name: string, description: string, url: string) {
  const gameCard = createElement("div", {
    title: name,
    className: "game-btn",
  });

  const imageDiv = createElement("div", {
    className: "game-btn-image-div",
  });

  const mainDiv = createElement("div", {
    className: "game-btn-main-div",
  });

  const infoDiv = createElement("div", {
    className: "game-btn-info-div",
  });

  const header = createElement("p", {
    textContent: name,
    className: "game-btn-header",
  });

  const descriptionParagraph = createElement("p", {
    textContent: description,
    className: "game-btn-description",
  });

  infoDiv.append(header, descriptionParagraph);

  const actionDiv = createElement("div", {
    className: "game-btn-action-div",
  });

  const playButton = createActionBtn("ph-fill ph-play", "Play");
  playButton.classList.add("game-btn-play-button");
  actionDiv.append(playButton);
  playButton.addEventListener("click", () => {
    window.location.hash = url;
  });

  mainDiv.append(infoDiv, actionDiv);

  gameCard.append(imageDiv, mainDiv);
  return gameCard;
}

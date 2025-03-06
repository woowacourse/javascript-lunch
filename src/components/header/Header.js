import { EVENT_TYPES } from "../../constants/constants.js";
import "./header.css";

export default class Header {
  render() {
    const $header = document.createElement("header");
    $header.className = "gnb";

    const $title = document.createElement("h1");
    $title.textContent = "점심 뭐 먹지";
    $title.className = "gnb__title text-title";

    const $button = document.createElement("button");
    $button.className = "gnb__button";
    $button.setAttribute("aria-label", "음식점 추가");
    $button.type = "button";

    const $img = document.createElement("img");
    $img.setAttribute("src", "/assets/add-button.png");
    $img.setAttribute("alt", "음식점 추가");

    $header.appendChild($title);
    $button.appendChild($img);
    $header.appendChild($button);

    $button.addEventListener(EVENT_TYPES.click, () => {
      const $modal = document.querySelector(".modal");
      $modal.classList.add("modal--open");
    });

    return $header;
  }
}

import { $, createElement } from "../utils/Dom";

const $header = createElement("header");
$header.className = "gnb";

const $headerTitle = createElement("h1");
$headerTitle.classList.add("gnb__title", "text-title");
$headerTitle.textContent = "점심 뭐 먹지";

const $headerButton = createElement("button");
$headerButton.classList.add("gnb__button");
$headerButton.setAttribute("aria-label", "음식점 추가");
$headerButton.setAttribute("type", "button");

const $addImg = createElement("img");
$addImg.setAttribute("alt", "음식점 추가");
$addImg.setAttribute("src", "/add-button.png"); //이미지 못 가져옴

$headerButton.append($addImg);
$header.append($headerTitle, $headerButton);

$headerButton.addEventListener("click", () => {
  $(".modal")?.classList.add("modal--open");
});

export default $header;

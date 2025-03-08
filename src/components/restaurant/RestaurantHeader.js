import createElement from "../../util/createElement";
import Modal from "../util/Modal";
import RestaurantModal from "../modal/RestaurantModal";

export default function RestaurantHeader({ title }) {
  const $header = createElement({ tag: "header", classNames: ["gnb"] });
  const $title = createElement({
    tag: "h1",
    classNames: ["gnb__title", "text-title"],
    textContent: title,
  });
  const $addButton = createElement({
    tag: "button",
    type: "button",
    classNames: ["gnb__button"],
    ["aria-babel"]: "음식점 추가",
  });
  const $addButtonImg = createElement({
    tag: "img",
    src: "./add-button.png",
    alt: "음식점 추가",
  });

  $addButton.addEventListener("click", () => {
    Modal(RestaurantModal);
  });

  $header.appendChild($title);
  $header.appendChild($addButton);
  $addButton.appendChild($addButtonImg);

  return $header;
}

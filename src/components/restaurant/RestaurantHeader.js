import createElement from "../../util/createElement";
import Modal from "../modal/Modal";
import RestaurantAddModal from "../modal/restaurant-add/RestaurantAddModal";

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
    Modal(RestaurantAddModal);
  });

  $header.appendChild($title);
  $header.appendChild($addButton);
  $addButton.appendChild($addButtonImg);

  return $header;
}

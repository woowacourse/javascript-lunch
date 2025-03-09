import createElement from "../../util/createElement";

export default function RestaurantHeader(text) {
  const $header = createElement({ tag: "header", classNames: ["gnb"] });
  const $title = createElement({
    tag: "h1",
    classNames: ["gnb__title", "text-title"],
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

  $title.textContent = "점심 뭐 먹지?";

  $header.appendChild($title);
  $header.appendChild($addButton);
  $addButton.appendChild($addButtonImg);

  return $header;
}

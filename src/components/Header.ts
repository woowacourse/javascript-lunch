import { $, createElement } from "../utils/dom";

type HeaderProps = {
  title: string;
};

const createHeader = ({ title }: HeaderProps) => {
  const $header = $("header");

  const $headerTitle = createElement("h1", {
    class: ["gnb__title", "text-title"],
    textContent: title,
  });
  $header?.appendChild($headerTitle);

  const $button = createElement("button", {
    type: "button",
    class: ["gnb__button"],
    innerHTML: `<img src="images/add-button.png" alt="음식점 추가" />`,
  });
  $header?.appendChild($button);

  return $header;
};

export default createHeader;

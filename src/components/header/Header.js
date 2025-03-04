export default function Header() {
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

  return $header;
}

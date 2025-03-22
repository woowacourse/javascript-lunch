import { IconButton } from "../../button/icon-button/IconButton.js";

export function Header({ title = "제목", onAddClick = () => {} }) {
  const header = document.createElement("header");
  header.className = "gnb";
  header.innerHTML = `
    <h1 class="gnb__title text-title">${title}</h1>
   `;

  header.appendChild(
    IconButton({
      name: "add",
      imgSrc: "./add-button.png",
      label: "음식점 추가",
      onClick: onAddClick,
    }),
  );

  return header;
}

import { modalOpen } from "../../util/modalAction.js";
import { IconButton } from "../button/IconButton.js";

export function Header({ title = "제목" }) {
  const header = document.createElement("header");
  header.className = "gnb";
  header.innerHTML = `
    <h1 class="gnb__title text-title">${title}</h1>
   `;

  header.appendChild(
    IconButton({
      imgSrc: "/add-button.png",
      label: "음식점 추가",
      onClick: modalOpen,
    })
  );

  return header;
}

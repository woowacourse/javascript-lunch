import { HeaderType } from "../../types/component/LayoutType";

export function Header({ title = "제목", icon = null }: HeaderType) {
  const header = document.createElement("header");
  header.className = "gnb";
  header.innerHTML = `
      <h1 class="gnb__title text-title">${title}</h1>
     `;

  if (icon) {
    header.appendChild(icon);
  }

  return header;
}

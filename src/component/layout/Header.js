export function Header({ title = "제목", icon = null }) {
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

export function createHeader({ title, onClick }) {
  const header = document.createElement("header");
  const button = document.createElement("button");
  button.innerHTML = /*html*/ `
    <img src="./add-button.png" alt="음식점 추가" />
  `;
  button.classList.add("gnb__button");

  button.addEventListener("click", () => onClick?.());

  header.innerHTML = /*html*/ `
  <h1 class="gnb__title text-title">${title}</h1>
  `;
  header.append(button);

  return header;
}

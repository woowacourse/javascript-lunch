export const createHeader = () => {
  const header = document.createElement("header");

  const headerTitle = document.createElement("h1");
  const imageButton = document.createElement("button");
  const image = document.createElement("img");

  header.classList.add("gnb");
  headerTitle.classList.add("gnb__title", "text-title");
  imageButton.classList.add("gnb__button");

  headerTitle.textContent = "점심 뭐 먹지";
  image.setAttribute("type", "button");
  image.setAttribute("src", "./add-button.png");

  imageButton.appendChild(image);
  header.appendChild(headerTitle);
  header.appendChild(imageButton);

  return header;
};

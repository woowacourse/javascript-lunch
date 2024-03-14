interface Props {
  title: string;
  imageSource: string;
  onButtonClick?: () => void;
}

export const createHeader = ({ title, imageSource, onButtonClick }: Props) => {
  const header = document.createElement("header");

  const headerTitle = document.createElement("h1");
  const imageButton = document.createElement("button");
  const image = document.createElement("img");

  header.classList.add("gnb");
  headerTitle.classList.add("gnb__title", "text-title");
  imageButton.classList.add("gnb__button");

  headerTitle.textContent = title;
  image.setAttribute("type", "button");
  image.setAttribute("src", imageSource);

  imageButton.appendChild(image);
  header.appendChild(headerTitle);
  header.appendChild(imageButton);

  if (onButtonClick) {
    imageButton.addEventListener("click", onButtonClick);
  }

  return header;
};

interface Props {
  imageSource: string;
  onButtonClick?: () => void;
}

export const createImageButton = ({ imageSource, onButtonClick }: Props) => {
  const imageButton = document.createElement("button");
  const image = document.createElement("img");

  imageButton.classList.add("gnb__button");
  image.setAttribute("type", "button");
  image.setAttribute("src", imageSource);

  imageButton.appendChild(image);
  if (onButtonClick) {
    imageButton.addEventListener("click", onButtonClick);
  }

  return imageButton;
};

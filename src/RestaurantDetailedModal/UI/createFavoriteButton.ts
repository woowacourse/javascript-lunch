import IMAGE from "../../IMAGE";

const createFavoriteButton = (isFilled: boolean): HTMLElement => {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("class", "favorite-button");

  const image = document.createElement("img");
  image.src = isFilled ? IMAGE.FILLED_STAR_BTN : IMAGE.EMPTY_STAR_BTN;
  button.appendChild(image);

  return button;
};

export default createFavoriteButton;

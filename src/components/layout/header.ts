import $createRestaurantForm from "../restaurant/createRestaurantForm";
import { HeaderConfigType } from "../../types/uiConfigType";

const $headerTitle = ({ title }: HeaderConfigType) => {
  const headerTitle = document.createElement("h1");
  headerTitle.classList.add("gnb__title", "text-title");
  headerTitle.textContent = title;

  return headerTitle;
};

const $headerModalButton = ({ buttonImage, buttonTitle }: HeaderConfigType) => {
  const modalButton = document.createElement("button");
  modalButton.type = "button";
  modalButton.classList.add("gnb__button");
  modalButton.ariaLabel = buttonTitle;
  modalButton.addEventListener("click", $createRestaurantForm);

  const modalButtonImage = document.createElement("img");
  modalButtonImage.src = buttonImage;
  modalButtonImage.alt = buttonTitle;
  modalButton.appendChild(modalButtonImage);

  return modalButton;
};

const $header = (headerInfo: HeaderConfigType) => {
  const header = document.createElement("header");
  header.classList.add("gnb");

  header.appendChild($headerTitle(headerInfo));
  header.appendChild($headerModalButton(headerInfo));

  return header;
};

export default $header;

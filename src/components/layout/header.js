import $createRestaurantForm from "../form/createRestaurantForm.js";
import { handleModalOpen } from "../modal/modal.js";

const $headerTitle = ({ title }) => {
  const headerTitle = document.createElement("h1");
  headerTitle.classList.add("gnb__title", "text-title");
  headerTitle.textContent = title;

  return headerTitle;
};

const $headerModalButton = ({ buttonImage, buttonTitle }) => {
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

const $header = (headerInfo) => {
  const header = document.createElement("header");
  header.classList.add("gnb");

  header.appendChild($headerTitle(headerInfo));
  header.appendChild($headerModalButton(headerInfo));

  return header;
};

export default $header;

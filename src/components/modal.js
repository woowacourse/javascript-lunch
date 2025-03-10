import $form from "./form.js";
import $restaurantItem from "./restaurant-item.js";
import { CATEGORY_ICON } from "../constants/iconPath.js";
import { FORM_EVENT } from "./formEvent.js";

export const handleModalClose = () => {
  document.querySelector(".modal").classList.remove("modal--open");
};

const handleModalCloseEsc = (e) => {
  if (e.key === "Escape") {
    handleModalClose();
  }
};

const handleModalOpen = () => {
  document.querySelector(".modal").classList.add("modal--open");
};

const $modal = (form) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("modal");

  const background = document.createElement("div");
  background.classList.add("modal-backdrop");
  wrapper.appendChild(background);

  const container = document.createElement("div");
  container.classList.add("modal-container");

  const title = document.createElement("h2");
  title.classList.add("modal-title", "text-title");
  title.textContent = "새로운 음식점";
  container.appendChild(title);
  container.appendChild($form(form, FORM_EVENT.addRestaurant));
  wrapper.appendChild(container);

  document.addEventListener("keydown", handleModalCloseEsc);
  background.addEventListener("click", handleModalClose);

  document
    .querySelector(".gnb__button")
    .addEventListener("click", handleModalOpen);

  return wrapper;
};

export default $modal;

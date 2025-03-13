import $form from "../form/form.js";
import $restaurantItem from "../restaurant/restaurant-item.js";
import $createRestaurantForm from "../form/createRestaurantForm.js";
import $createRestaurantInfo from "./createRestaurantInfo.js";
import { CATEGORY_ICON } from "../../constants/iconPath.js";

export const handleModalClose = () => {
  document.querySelector(".modal").classList.remove("modal--open");
};

const handleModalCloseEsc = (e) => {
  if (e.key === "Escape") {
    handleModalClose();
  }
};

export const handleModalOpen = () => {
  document.querySelector(".modal").classList.add("modal--open");
};

const $modal = (type, id = "") => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("modal");

  const background = document.createElement("div");
  background.classList.add("modal-backdrop");
  wrapper.appendChild(background);

  const container = document.createElement("div");
  container.classList.add("modal-container");
  wrapper.appendChild(container);

  document.addEventListener("keydown", handleModalCloseEsc);
  background.addEventListener("click", handleModalClose);

  return wrapper;
};

export default $modal;

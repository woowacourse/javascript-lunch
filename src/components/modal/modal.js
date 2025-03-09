import $form from "../form-elements/form.js";
import $restaurantItem from "../restaurant/restaurant-item.js";
import { CATEGORY_ICON } from "../../constants/iconPath.js";

export const addRestaurant = (data) => {
  handleModalClose();
  const categoryIcon = CATEGORY_ICON[data.category];
  const newRestaurant = {
    categoryIcon,
    categoryTitle: data.category,
    name: data.name,
    distance: `캠퍼스부터 ${data.distance}분 내`,
    description: data.description,
  };
  document
    .querySelector(".restaurant-list")
    .appendChild($restaurantItem(newRestaurant));
};

export const handleModalClose = () => {
  document.querySelector(".modal").classList.remove("modal--open");
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
  title.innerText = "새로운 음식점";
  container.appendChild(title);
  container.appendChild($form(form));
  wrapper.appendChild(container);

  document.addEventListener("keydown", (e) => {
    e.key === "Escape" && handleModalClose();
  });
  background.addEventListener("click", handleModalClose);

  document
    .querySelector(".gnb__button")
    .addEventListener("click", handleModalOpen);

  return wrapper;
};

export default $modal;

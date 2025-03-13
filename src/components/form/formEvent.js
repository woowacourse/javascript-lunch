import $restaurantItem from "../restaurant/restaurant-item.js";
import { CATEGORY_ICON } from "../../constants/iconPath.js";
import { validateRestaurantForm } from "../../validation/validationForm.js";
import { handleModalClose } from "../modal/modal.js";
import { storageHandler } from "../../utils/storageHandler.js";
import { STORAGE_KEY_NAME } from "../../constants/storage.js";

export const restaurantFormReset = () => {
  handleModalClose();
  const form = document.getElementById("add-restaurant-form");
  form.reset();
};

const addRestaurant = (data) => {
  const newRestaurant = {
    categoryIcon: CATEGORY_ICON[data.category],
    categoryTitle: data.category,
    name: data.name,
    distance: `캠퍼스부터 ${data.distance}분 내`,
    description: data.description,
    link: data.link,
    id: new Date(),
  };
  document
    .querySelector(".restaurant-list")
    .appendChild($restaurantItem(newRestaurant));

  const currentItem = storageHandler.getItem(STORAGE_KEY_NAME);
  storageHandler.setItem(STORAGE_KEY_NAME, [...currentItem, newRestaurant]);

  const noRestaurant = document.getElementById("noRestaurant");
  if (noRestaurant) noRestaurant.remove();
};

export const handleAddRestaurant = (e) => {
  e.preventDefault();

  try {
    const form = document.getElementById("add-restaurant-form");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    validateRestaurantForm(form);
    addRestaurant(data);
    restaurantFormReset(form);
  } catch (error) {
    alert(error.message);
  }
};

export const FORM_EVENT = {
  addRestaurant: {
    eventType: "submit",
    eventHandler: handleAddRestaurant,
  },
};

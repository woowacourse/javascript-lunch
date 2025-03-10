import $restaurantItem from "../restaurant/restaurant-item.js";
import { CATEGORY_ICON } from "../../constants/iconPath.js";
import { validateRestaurantForm } from "../../validation/validationForm.js";
import { handleModalClose } from "../modal/modal.js";

export const restaurantFormReset = () => {
  handleModalClose();
  const form = document.getElementById("add-restaurant-form");
  form.reset();
};

const addRestaurant = (data) => {
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

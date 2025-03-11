import "./RestaurantForm.css";
import validateRestaurant from "../../validators/validateRestaurant.js";
import renderRestaurantElement from "../RestaurantItem/RestaurantItem.js";
import { restaurantsData } from "../../restaurantsMockData.js";

export default class RestaurantForm {
  constructor(formElement, restaurantList, modal) {
    this.formElement = formElement;
    this.restaurantList = restaurantList;
    this.modal = modal;
    this.addEventListeners();
  }

  addEventListeners() {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleSubmit();
    });
  }

  handleSubmit() {
    const nameInput = document.getElementById("name");
    const descriptionInput = document.getElementById("description");
    const categoryInput = document.getElementById("category");
    const distanceInput = document.getElementById("distance");
    const linkInput = document.getElementById("link");

    const restaurantsNameList = restaurantsData.map(
      (restaurant) => restaurant.name
    );

    const newRestaurant = {
      category: categoryInput.value,
      name: nameInput.value,
      distance: `${distanceInput.value}분 내`,
      description: descriptionInput.value,
      link: linkInput.value,
    };

    const errorMessage = validateRestaurant(newRestaurant, restaurantsNameList);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    restaurantsData.push(newRestaurant);

    const restaurantItem = renderRestaurantElement(newRestaurant);
    this.restaurantList.appendChild(restaurantItem);
    this.formElement.reset();
    this.modal.close();
  }
}

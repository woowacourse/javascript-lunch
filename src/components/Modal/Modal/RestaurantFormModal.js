import { restaurantsData } from "../../../../public/database/restaurants.js";
import validateRestaurant from "../../../validators/validateRestaurant.js";
import modalButton from "../Button/Button.js";
import createCategory from "../Select/CreateCategory.js";
import createDescription from "../Select/CreateDescription.js";
import createDistance from "../Select/CreateDistance.js";
import createLink from "../Select/CreateLink.js";
import createName from "../Select/CreateName.js";
import "./Modal.css";

export default class RestaurantFormModal {
  constructor(restaurantList, openButton) {
    this.modalElement = document.getElementById("add-restaurant-dialog");
    this.restaurantList = restaurantList;
    this.addFormFields();
    ß;
    this.openButton = openButton;
    this.formElement = this.modalElement.querySelector("form");
    this.closeButton = document.querySelector("#cancel-dialog-btn");
    this.addEventListeners();
  }

  addFormFields() {
    createCategory();
    createName();
    createDistance();
    createDescription();
    createLink();
    modalButton();
  }

  addEventListeners() {
    this.openButton.addEventListener("click", () => this.open());
    this.closeButton.addEventListener("click", () => this.close());

    this.modalElement.addEventListener("click", (event) => {
      if (!event.target.closest(".modal-container")) {
        this.close();
      }
    });
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
      distance: distanceInput.value,
      description: descriptionInput.value,
      link: linkInput.value,
    };

    const errorMessage = validateRestaurant(newRestaurant, restaurantsNameList);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    this.restaurantList.addRestaurant(newRestaurant);

    this.formElement.reset();
    this.close();
  }

  open() {
    this.modalElement.showModal();
  }

  close() {
    this.modalElement.close();
  }
}

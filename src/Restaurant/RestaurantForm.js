import { restaurantsData } from "../constants/restaurantsMockData.js";
import validateRestaurant from "../validators/validateRestaurant.js";
import renderRestaurantElement from "./RestaurantItem.js";
import RestaurantList from "./RestaurantList.js";
import "./RestaurantForm.css";

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
      distance: distanceInput.value,
      description: descriptionInput.value,
      link: linkInput.value,
    };

    const errorMessage = validateRestaurant(newRestaurant, restaurantsNameList);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    RestaurantList.addRestaurant(newRestaurant);

    this.formElement.reset();
    this.modal.close();
  }
}

// 1. RestaurantItem
// renderRestaurantElement() 함수는 레스토랑 데이터를 받아서 <li> 요소를 생성.
// 즉, 하나의 레스토랑 정보를 HTML 요소로 변환하는 역할을 함.

// 2. RestaurantList.js
// 리스트 컨테이너(.restaurant-list-container) 안에 <ul class="restaurant-list">를 추가.
// 개별 RestaurantItem을 담을 공간을 만드는 역할.

//  3. RestaurantForm.js
// 사용자가 폼을 제출하면, 입력된 데이터를 이용해 새로운 레스토랑 객체를 생성.
// 이 데이터를 renderRestaurantElement를 통해 <li> 요소로 변환.
// 변환된 <li> 요소를 .restaurant-list에 추가.

import "../css/style.css";
import { $ } from "./util/querySelector";
import { sortRestaurant } from "./domain/Sort";
import { checkSelected } from "./InputCheck";
import RestaurantInfo from "./RestaurantInfo";
import Restaurants from "./domain/Restaurants";
import Input from "./Input";
import Alert from "./util/Alert";
import Filter from "./domain/Filter";
import Modal from "./components/Modal";
import LocalStorage from "./util/LocalStorage";
import Element from "./Element";
import RestaurantList from "./components/RestaurantList";
import 일식 from "../templates/category-japanese.png";
import 중식 from "../templates/category-chinese.png";
import 한식 from "../templates/category-korean.png";
import 양식 from "../templates/category-western.png";
import 아시안 from "../templates/category-asian.png";
import 기타 from "../templates/category-etc.png";
import addButtonImg from "../templates/add-button.png";

const newRestaurant = new Restaurants();
const addButton = $(".gnb__button");
const categoryFilter = $("#category-filter");
const sortingFilter = $("#sorting-filter");
const save = LocalStorage.setItem(localStorage.length);

addButton.querySelector("img").src = addButtonImg;

categoryFilter.addEventListener("change", () => {
  updateRestaurant();
});

sortingFilter.addEventListener("change", () => {
  updateRestaurant();
});

addButton.addEventListener("click", () => {
  const modal = new Modal(Element.addListContents);
  const submitButton = $(".button--primary");
  const cancelButton = $(".button--secondary");

  modal.render();

  submitButton?.addEventListener("click", (event) => {
    const submitAlert = new Alert("#alert-submit");

    event.preventDefault();
    submitNewRestaurant(modal, submitAlert);
  });

  cancelButton?.addEventListener("click", () => {
    cancelAddRestaurant(modal);
  });

  checkSelected();
});

const submitNewRestaurant = (modal, submitAlert) => {
  try {
    const restaurant = RestaurantInfo.get();

    Input.checkAll(restaurant);
    submitAlert.hide();
    newRestaurant.add(restaurant);
    updateRestaurant();
    save(restaurant);
    resetRestaurantInput();
    modal.close();
  } catch (e) {
    submitAlert.show(e.message);
  }
};

const cancelAddRestaurant = (modal) => {
  resetRestaurantInput();
  modal.close();
};

const updateRestaurant = () => {
  $(".restaurant-list-container").innerHTML = "";
  const sortResult = sortRestaurant(
    sortingFilter.value,
    newRestaurant.getList()
  );
  const filterResult = Filter.byCategory(categoryFilter.value, sortResult);
  return filterResult.forEach((element) => {
    const restaurantList = new RestaurantList(
      element.name,
      element.distance,
      element.category,
      getMatchImage(element.category)
    );
    restaurantList.render();
  });
};

const getMatchImage = (category) => {
  switch (category) {
    case "일식":
      return 일식;
    case "중식":
      return 중식;
    case "한식":
      return 한식;
    case "양식":
      return 양식;
    case "아시안":
      return 아시안;
    case "기타":
      return 기타;
  }
};

const resetRestaurantInput = () => {
  $("#category").value = "";
  $("#name").value = "";
  $("#distance").value = "";
  $("#link").value = "";
  $("#description").value = "";
};

window.onload = function () {
  LocalStorage.getItems().forEach((item) => {
    newRestaurant.add(item);
  });
  updateRestaurant();
};

import "../css/style.css";
import Modal from "../src/util/Modal";
import RestaurantInfo from "./domain/RestaurantInfo";
import Restaurants from "./domain/Restaurants";
import Input from "./Input";
import Alert from "./util/Alert";
import { $ } from "./util/querySelector";
import Filter from "./domain/Filter";
import { IMAGE } from "./util/ImageLoader";
import { sort } from "./domain/Sort";
import LocalStorage from "./util/LocalStorage";
import Elements from "./Element";
import createSelectInput from "./util/createSelectInput";

const newRestaurant = new Restaurants();

// 음식점 입력 모달 생성
const restaurantInputModal = Modal.create();
$("main").appendChild(restaurantInputModal);

const addRestaurantFormTemplate = $("#new-restaurant-form-template");
const addRestaurantForm = document.importNode(addRestaurantFormTemplate.content, true);
addRestaurantForm.querySelector(".category-input").innerHTML = createSelectInput(
  "category",
  "카테고리",
  ["", "한식", "중식", "일식", "양식", "아시안", "기타"],
  ["선택해 주세요", "한식", "중식", "일식", "양식", "아시안", "기타"],
).innerHTML;
addRestaurantForm.querySelector(".distance-input").innerHTML = createSelectInput(
  "distance",
  "거리(걸리는 시간)",
  ["", "5", "10", "15", "20", "30"],
  ["선택세 주세요", "5", "10", "15", "20", "30"],
).innerHTML;
addRestaurantForm.querySelector("form").setAttribute("id", "restaurant-input-form");

Modal.setChildElement(restaurantInputModal, addRestaurantForm);

const addButton = $(".gnb__button");
addButton.querySelector("img").src = IMAGE.ADD_BTN;
addButton.addEventListener("click", () => {
  $("#restaurant-input-form").reset();
  Modal.open(restaurantInputModal);
});

// 음식점 입력
const cancelButton = $(".button--secondary");
const submitButton = $(".button--primary");
const submitAlert = $("#alert-submit");
const linkInput = $("#link");
const linkAlert = $("#alert-link");
const catgoryInput = $("#category");
const categoryAlert = $("#alert-category");
const nameInput = $("#name");
const nameAlert = $("#alert-name");
const distanceInput = $("#distance");
const distanceAlert = $("#alert-distance");

catgoryInput.addEventListener("focusout", () => {
  try {
    Input.checkCategory(catgoryInput.value);
    Alert.close(categoryAlert);
  } catch (e) {
    Alert.open(categoryAlert, e.message);
  }
});

nameInput.addEventListener("focusout", () => {
  try {
    Input.checkName(nameInput.value);
    Alert.close(nameAlert);
  } catch (e) {
    Alert.open(nameAlert, e.message);
  }
});

distanceInput.addEventListener("focusout", () => {
  try {
    Input.checkDistance(distanceInput.value);
    Alert.close(distanceAlert);
  } catch (e) {
    Alert.open(distanceAlert, e.message);
  }
});

linkInput.addEventListener("focusout", () => {
  try {
    Input.checkLink(linkInput.value);
    Alert.close(linkAlert);
  } catch (e) {
    Alert.open(linkAlert, e.message);
  }
});

const categoryFilter = $("#category-filter");
const sortingFilter = $("#sorting-filter");

const updateRestaurant = () => {
  $(".restaurant-list-container").innerHTML = "";
  const sortResult = sort(sortingFilter.value, newRestaurant.getList());
  const filterResult = Filter.byCategory(categoryFilter.value, sortResult);
  return filterResult.forEach((element) => Elements.appendNewRestaurant(element))
};

addButton.querySelector("img").src = IMAGE.ADD_BTN;
addButton.addEventListener("click", () => {
  Modal.open(restaurantInputModal);
});

window.onload = () => {
  LocalStorage.getItem("restaurants").forEach((item) => {
    newRestaurant.add(item);
  });
  updateRestaurant();
}

categoryFilter.addEventListener("change", () => {
  updateRestaurant();
});

sortingFilter.addEventListener("change", () => {
  updateRestaurant();
});

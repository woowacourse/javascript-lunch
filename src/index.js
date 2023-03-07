import "../css/style.css";
import Modal from "../src/util/Modal";
import Restaurants from "./domain/Restaurants";
import RestaurantValidator from "./domain/RestaurantValidator";
import Alert from "./util/Alert";
import { $ } from "./util/querySelector";
import Filter from "./domain/Filter";
import { IMAGE } from "./util/ImageLoader";
import { sort } from "./domain/Sort";
import LocalStorage from "./util/LocalStorage";
import appendNewRestaurant from "./util/appendNewRestaurant";
import createSelectInput from "./util/createSelectInput";

const CATEGORY = ["한식", "중식", "일식", "양식", "아시안", "기타"];
const ESTIMATEDTIME = ["5", "10", "15", "20", "30"];

const newRestaurant = new Restaurants();

// 카테고리, 정렬 필터 생성
const filterContainer = $(".restaurant-filter-container");

const categoryFilterElement = createSelectInput(
  "category-filter",
  "",
  ["전체", ...CATEGORY],
  ["전체", ...CATEGORY],
);
categoryFilterElement.setAttribute("class", "restaurant-filter");
filterContainer.appendChild(categoryFilterElement);

const sortingFilterElement = createSelectInput(
  "sorting-filter",
  "",
  ["name", "distance"],
  ["이름순", "거리순"],
);
sortingFilterElement.setAttribute("class", "restaurant-filter");
filterContainer.appendChild(sortingFilterElement);

// 음식점 입력 모달 생성
const restaurantInputModal = Modal.create();
$("main").appendChild(restaurantInputModal);

const addRestaurantFormTemplate = $("#new-restaurant-form-template");
const addRestaurantForm = document.importNode(addRestaurantFormTemplate.content, true);
addRestaurantForm.querySelector(".category-input").innerHTML = createSelectInput(
  "category",
  "카테고리",
  ["", ...CATEGORY],
  ["선택해 주세요", ...CATEGORY],
).innerHTML;
addRestaurantForm.querySelector(".distance-input").innerHTML = createSelectInput(
  "distance",
  "거리(걸리는 시간)",
  ["", ...ESTIMATEDTIME],
  ["선택해 주세요", ...ESTIMATEDTIME],
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
const descriptionInput = $("#description");

const categoryFilter = $("#category-filter");
const sortingFilter = $("#sorting-filter");

catgoryInput.addEventListener("focusout", () => {
  try {
    RestaurantValidator.checkCategory(catgoryInput.value);
    Alert.close(categoryAlert);
    Alert.close(submitAlert);
  } catch (e) {
    Alert.open(categoryAlert, e.message);
  }
});

nameInput.addEventListener("focusout", () => {
  try {
    RestaurantValidator.checkName(nameInput.value);
    Alert.close(nameAlert);
    Alert.close(submitAlert);
  } catch (e) {
    Alert.open(nameAlert, e.message);
  }
});

distanceInput.addEventListener("focusout", () => {
  try {
    RestaurantValidator.checkDistance(distanceInput.value);
    Alert.close(distanceAlert);
    Alert.close(submitAlert);
  } catch (e) {
    Alert.open(distanceAlert, e.message);
  }
});

linkInput.addEventListener("focusout", () => {
  try {
    RestaurantValidator.checkLink(linkInput.value);
    Alert.close(linkAlert);
    Alert.close(submitAlert);
  } catch (e) {
    Alert.open(linkAlert, e.message);
  }
});

cancelButton.addEventListener("click", () => {
  Modal.close(restaurantInputModal);
});

const readRestaurantInput = () => {
  const category = catgoryInput.value;
  const name = nameInput.value;
  const estimatedTime = distanceInput.value;
  const description = descriptionInput.value;
  const link = linkInput.value;

  return {
    category, name, estimatedTime, description, link,
  };
};

const updateRestaurant = () => {
  $(".restaurant-list-container").innerHTML = "";
  LocalStorage.setItem("restaurants", newRestaurant.getList());
  const sortResult = sort(sortingFilter.value, newRestaurant.getList());
  const filterResult = Filter.byCategory(categoryFilter.value, sortResult);
  return filterResult.forEach((element) => appendNewRestaurant(element));
};

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const restaurant = readRestaurantInput();

  try {
    RestaurantValidator.checkAll(restaurant);
  } catch (e) {
    Alert.open(submitAlert, e.message);
    return;
  }

  newRestaurant.add(restaurant);
  updateRestaurant();
  Modal.close(restaurantInputModal);
});

window.onload = () => {
  LocalStorage.getItem("restaurants").forEach((item) => {
    newRestaurant.add(item);
  });
  updateRestaurant();
};

categoryFilter.addEventListener("change", () => {
  updateRestaurant();
});

sortingFilter.addEventListener("change", () => {
  updateRestaurant();
});

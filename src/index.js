import "../css/style.css";
import { $, $$ } from "./util/querySelector";
import { sortRestaurant, sortRestaurantNode } from "./domain/Sort";
import { checkSelected } from "./InputCheck";
import RestaurantInfo from "./RestaurantInfo";
import Restaurants from "./domain/Restaurants";
import InputError from "./InputError";
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
import starFilled from "../templates/favorite-icon-filled.png";
import starEmpty from "../templates/favorite-icon-lined.png";
import SelectFilter from "./components/SelectFilter";
import Category from "./components/Category";

const newRestaurant = new Restaurants();
const addButton = $(".gnb__button");
const save = LocalStorage.setItem(localStorage.length+1);
let currentCategory = "all";
addButton.querySelector("img").src = addButtonImg;

function defaultRender() {
  const selectFilter = new SelectFilter();
  const categorySelect = new Category();
  selectFilter.render();
  categorySelect.render();
  categorySelect.handleClickCategory(
    renderFavorates,
    reRenderRestaurantList,
  );
}

function updateRestaurant() {
  $(".restaurant-list-container").innerHTML = "";
  const sortResult = sortRestaurant(
    $("#sorting-filter")?.value,
    newRestaurant.getList()
  );
  const filterResult = Filter.byCategory(
    $("#category-filter")?.value,
    sortResult
  );
  filterResult?.forEach((element, idx) => {
    renderAllList(element, idx);
  });
}

function renderAllList(element, idx) {
  const restaurantList = new RestaurantList(
    element,
    getMatchImage(element.category),
    idx,
    starFilled,
    starEmpty
  );
  !restaurantList.isDeleted && restaurantList.render();
  currentCategory === "all"
    ? restaurantList.hadleListClick(reRenderRestaurantList, deleteList)
    : restaurantList.hadleListClick(renderFavorates, deleteList);
  newRestaurant.addNode(restaurantList);
}

function submitNewRestaurant(modal, submitAlert) {
  try {
    const restaurant = RestaurantInfo.get();
    InputError.checkAll(restaurant);
    submitAlert.hide();
    newRestaurant.add(restaurant);
    updateRestaurant();
    newRestaurant.getNodeList();
    save(restaurant);
    resetRestaurantInput();
    modal.close();
  } catch (e) {
    submitAlert.show(e.message);
  }
}

function cancelAddRestaurant(modal) {
  resetRestaurantInput();
  modal.close();
}

function getMatchImage(category){
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

function resetRestaurantInput() {
  $("#category").value = "";
  $("#name").value = "";
  $("#distance").value = "";
  $("#link").value = "";
  $("#description").value = "";
}

function reRenderRestaurantList() {
  $(".restaurant-list-container").innerHTML = "";
  const sortResult = sortRestaurantNode(
    $("#sorting-filter")?.value,
    newRestaurant.getNodeList()
  );
  const filterResult = Filter.byNodeCategory(
    $("#category-filter")?.value,
    sortResult
  );
  filterResult?.forEach((element) => {
    !element.isDeleted && element.render();
    currentCategory === "all"
      ? element.hadleListClick(reRenderRestaurantList, deleteList)
      : element.hadleListClick(renderFavorates, deleteList);
  });
}

function renderFavorates() {
  $(".restaurant-list-container").innerHTML = "";
  newRestaurant.getNodeList().forEach((item) => {
    if (item.isFavorate) {
      !item.isDeleted && item.render();
      currentCategory === "all"
        ? item.hadleListClick(reRenderRestaurantList, deleteList)
        : item.hadleListClick(renderFavorates, deleteList);
    }
  });
}

function deleteList(name) {
  $(".restaurant-list-container").innerHTML = "";
  newRestaurant.getNodeList()?.forEach((element) => {
    if (element.isDeleted === false) {
      element.render();
      currentCategory === "all"
        ? element.hadleListClick(reRenderRestaurantList, deleteList)
        : element.hadleListClick(renderFavorates, deleteList);
    }
    location.reload();
    LocalStorage.remove(name);
  });
}

defaultRender();

$("#sorting-filter")?.addEventListener("change", reRenderRestaurantList);

$("#category-filter")?.addEventListener("change", reRenderRestaurantList);

$(".gnb__button").addEventListener("click", () => {
  const modal = new Modal(Element.addListContents);

  modal.render();
  $(".button--primary")?.addEventListener("click", (event) => {
    const submitAlert = new Alert("#alert-submit");

    event.preventDefault();
    submitNewRestaurant(modal, submitAlert);
  });

  $(".button--secondary")?.addEventListener("click", () => {
    cancelAddRestaurant(modal);
  });

  checkSelected();
});

window.onload = function () {
  LocalStorage.getItems().forEach((item) => {
    newRestaurant.add(item);
  });
  updateRestaurant();
};



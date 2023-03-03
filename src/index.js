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


const modal = new Modal();
const newRestaurant = new Restaurants()

const addButton = $(".gnb__button");
const cancelButton = $(".button--secondary")
const modalBg = $(".modal-backdrop");

const submitButton = $(".button--primary");
const submitAlert = new Alert('#alert-submit');
const linkInput = $("#link");
const linkAlert = new Alert("#alert-link");
const catgoryInput = $("#category");
const categoryAlert = new Alert("#alert-category");
const nameInput = $("#name");
const nameAlert = new Alert("#alert-name");
const distanceInput = $("#distance");
const distanceAlert = new Alert("#alert-distance");
const descriptionInput = $("#description");

const categoryFilter = $('#category-filter');
const sortingFilter = $('#sorting-filter'); 

const updateRestaurant = () => {
    $(".restaurant-list-container").innerHTML = '';
    const sortResult = sort(sortingFilter.value, newRestaurant.getList());
    const filterResult = Filter.byCategory(categoryFilter.value, sortResult);
    return filterResult.forEach((element) => Elements.appendNewRestaurant(element))
};

const save = LocalStorage.setItem(localStorage.length);

const resetRestaurantInput = () => {
    catgoryInput.value = "";
    nameInput.value = "";
    distanceInput.value = "";
    linkInput.value = "";
    descriptionInput.value = "";
};

addButton.querySelector("img").src = IMAGE.ADD_BTN;
addButton.addEventListener("click", () => {
  modal.open();
});

modalBg.addEventListener("click", () => {
  modal.close();
});

document.addEventListener("keyup", (event) => {
  if (event.key === "Escape") modal.close();
});

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    try {
        const restaurant = RestaurantInfo.get();
        Input.checkAll(restaurant);
        submitAlert.hide();
        newRestaurant.add(restaurant);
        updateRestaurant()
        save(restaurant)
        modal.close();
        resetRestaurantInput()
    } catch (e) {
        submitAlert.show(e.message);
    }
});

cancelButton.addEventListener("click", () => {
    resetRestaurantInput()
    modal.close();
})


catgoryInput.addEventListener("focusout", () => {
  try {
    Input.checkCategory(catgoryInput.value);
    categoryAlert.hide();
  } catch (e) {
    categoryAlert.show(e.message);
  }
});


nameInput.addEventListener("focusout", () => {
  try {
    Input.checkName(nameInput.value);
    nameAlert.hide();
  } catch (e) {
    nameAlert.show(e.message);
  }
});

distanceInput.addEventListener("focusout", () => {
  try {
    Input.checkDistance(distanceInput.value);
    distanceAlert.hide();
  } catch (e) {
    distanceAlert.show(e.message);
  }
});

linkInput.addEventListener("focusout", () => {
  try {
    Input.checkLink(linkInput.value);
    linkAlert.hide();
  } catch (e) {
    linkAlert.show(e.message);
  }
});

window.onload = function () {
    LocalStorage.getItems().forEach(item => {
        newRestaurant.add(item);
    });
    updateRestaurant();
}

categoryFilter.addEventListener('change', () => {
    updateRestaurant()
});

sortingFilter.addEventListener('change', () => {
    updateRestaurant()
});

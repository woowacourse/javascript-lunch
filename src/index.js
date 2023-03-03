import "../css/style.css";
import Modal from "../src/util/Modal";
import RestaurantInfo from "./domain/RestaurantInfo";
import Restaurants from "./domain/Restaurants";
import Input from "./Input";
import Alert from "./util/Alert";
import { $ } from "./util/querySelector";
import Filter from "./domain/Filter";
import { IMAGE } from "./util/ImageLoader";

const saveLocalStorage = (initialCount) => {
    let cnt = initialCount
    return function (restaurantInfo) {
        localStorage.setItem(cnt, JSON.stringify(restaurantInfo))
        cnt += 1
        console.log(cnt)
    }
}

const getLocalStorage = () => {
    return Object.values(window.localStorage).map(item => JSON.parse(item))
}

const save = saveLocalStorage(localStorage.length);

const modal = new Modal();
const newRestaurant = new Restaurants()

const submitButton = $(".button--primary");
const submitAlert = new Alert('#alert-submit');
const cancelButton = $(".button--secondary")

const linkInput = $("#link");
const linkAlert = new Alert("#alert-link");
const catgoryInput = $("#category");
const categoryAlert = new Alert("#alert-category");
const nameInput = $("#name");
const nameAlert = new Alert("#alert-name");
const distanceInput = $("#distance");
const distanceAlert = new Alert("#alert-distance");
const descriptionInput = $("#description");
const addButton = $(".gnb__button");

const categoryFilter = $('#category-filter');
const sortingFilter = $('#sorting-filter'); 

const createElement = ({ category, name, distance, description, link }) => {
    const listTemplate = $("#list-template")
    const listClone = document.importNode(listTemplate.content, true)
    listClone.querySelector(".restaurant__name").textContent = name;
    listClone.querySelector(".restaurant__distance").textContent = distance;
    listClone.querySelector(".restaurant__description").textContent = description;
    console.log(category)
    listClone.querySelector(".category-icon").src = IMAGE[category]
    $(".restaurant-list-container").appendChild(listClone)
};

addButton.querySelector("img").src = IMAGE.ADD_BTN
addButton.addEventListener("click", () => {
  modal.open();
});

const modalBg = $(".modal-backdrop");
modalBg.addEventListener("click", () => {
  modal.close();
});

document.addEventListener("keyup", (event) => {
  if (event.key === "Escape") modal.close();
});

const resetRestaurantInput = () => {
    catgoryInput.value = "";
    nameInput.value = "";
    distanceInput.value = "";
    linkInput.value = "";
    descriptionInput.value = "";
};

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    try {
        const restaurant = RestaurantInfo.get();
        Input.checkAll(restaurant);
        submitAlert.hide();
        newRestaurant.add(restaurant);
        updateRestaurant()
        // createElement(restaurant);
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
    getLocalStorage().forEach(item => {
        newRestaurant.add(item);
    });
    updateRestaurant();
}

categoryFilter.addEventListener('change', () => {
    // $(".restaurant-list-container").innerHTML = '';
    // if (event.target.value === '전체') {
    //     newRestaurant.getList().forEach((restaurant) => createElement(restaurant));
    //     return;
    // }
    // Filter.byCategory(event.target.value, newRestaurant.getList())
    //     .forEach((restaurant) => createElement(restaurant));
    updateRestaurant()
});

sortingFilter.addEventListener('change', () => {
    // $(".restaurant-list-container").innerHTML = '';
    // if (event.target.value === 'name') {
    //     newRestaurant.sortByName().forEach((element) => createElement(element));
    //     return;
    // }
    // if (event.target.value === 'distance') {
    //     newRestaurant.sortByDistance().forEach((element) => createElement(element));
    //     return;
    // }
    updateRestaurant()

});

const sort = () => {
    if (sortingFilter.value === 'name') {
        return newRestaurant.sortByName()
    }
    if (sortingFilter.value === 'distance') {
        return newRestaurant.sortByDistance()
    }
}
const filter = (sortedRestaurant) => {
    if (categoryFilter.value === '전체') {
        return sortedRestaurant;
    }
    return Filter.byCategory(categoryFilter.value, sortedRestaurant)
}

const updateRestaurant = () => {
    $(".restaurant-list-container").innerHTML = '';
    filter(sort()).forEach((element) => createElement(element))
}
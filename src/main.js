import createButton from "./components/button/button.js";
import createDropdownBox from "./components/dropdown/dropdown.js";
import createInputBox from "./components/input/input.js";
import createRestaurantForm from "./components/restaurant/form/form.js";
import createRestaurantItem from "./components/restaurant/item/item.js";
import createTextAreaBox from "./components/textarea/textarea.js";
import RestaurantList from "./model/RestaurantList.js";
import Toast from "./components/Toast/Toast.js";
import { extractFormData } from "./utils/extract.js";
import { restaurantFormValidation } from "./validation/restaurantFormValidation.js";
import { INITIAL_RESTAURANT } from "./settings/settings.js";
const app = document.querySelector("#app");
const modalContainer = document.querySelector(".modal-container");
const restaurantListElement = document.querySelector(".restaurant-list");
const restaurantFrom = createRestaurantForm();
modalContainer.appendChild(restaurantFrom);
const restaurantAddForm = document.querySelector(".restaurant-add-form");
let restaurantList;
if (localStorage.getItem("restaurantList")) {
  restaurantList = new RestaurantList([
    ...JSON.parse(localStorage.getItem("restaurantList")),
  ]);
} else {
  restaurantList = new RestaurantList([...INITIAL_RESTAURANT]);
  localStorage.setItem("restaurantList", JSON.stringify(restaurantList));
}

restaurantList.List.forEach((restaurantItem) =>
  restaurantListElement.appendChild(createRestaurantItem(restaurantItem))
);

function handleBottomSheetToggle(event) {
  const modal = document.querySelector(".modal");

  if (event.target.closest(".restaurant-add-button")) {
    modal.show();
  }

  if (event.target.closest(".modal-backdrop")) {
    modal.close();
  }
}
function handleFavoriteToggle(event) {
  if (!event.target.classList.contains("favorite-icon")) return;
  const parent = event.target.parentElement;
  const name = parent.querySelector(".restaurant__name").textContent;
  const restaurant = restaurantList.searchRestaurant(name);
  if (!restaurant) return;
  restaurantList.toggleFavoriteRestaurant(restaurant);

  localStorage.setItem("restaurantList", JSON.stringify(restaurantList.List));

  console.log(JSON.parse(localStorage.getItem("restaurantList")));
  event.target.src = restaurant.isFavorite ? "./Star.png" : "./Un-star.png";
}

function handleAddRestaurantFormSubmit(event) {
  event.preventDefault();
  try {
    const restaurantForm = extractFormData(restaurantAddForm);
    const restaurant = restaurantFormValidation(restaurantForm);
    const restaurantListElement = document.querySelector(".restaurant-list");

    restaurantList.addRestaurant(restaurant);
    localStorage.setItem("restaurantList", JSON.stringify(restaurantList.List));
    restaurantListElement.appendChild(createRestaurantItem(restaurantForm));

    Toast.showToast(`${restaurant.name} 음식점을 추가했습니다.`, "success");
    const modal = document.querySelector(".modal");
    restaurantAddForm.reset();
    modal.close();
  } catch (error) {
    Toast.showToast(`${error.message}`, "error");
  }
}

document.body.addEventListener("click", (event) => {
  [handleBottomSheetToggle, handleFavoriteToggle].forEach((handler) =>
    handler(event)
  );
});

restaurantAddForm.addEventListener("submit", handleAddRestaurantFormSubmit);

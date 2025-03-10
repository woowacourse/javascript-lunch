import createButton from "./components/button/button.js";
import createDropdownBox from "./components/dropdown/dropdown.js";
import createInputBox from "./components/input/input.js";
import createRestaurantForm from "./components/restaurant/form/form.js";
import createRestaurantItem from "./components/restaurant/item/item.js";
import createTextAreaBox from "./components/textarea/textarea.js";
import { restaurantList } from "./model/RestaurantList.js";

const app = document.querySelector("#app");
const modalContainer = document.querySelector(".modal-container");
const restaurantFrom = createRestaurantForm();
const restaurantListElement = document.querySelector(".restaurant-list");
modalContainer.appendChild(restaurantFrom);
restaurantList.forEach((restaurantItem) =>
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
// document.addEventListener("click", function (e) {
//   if (e.target.classList.contains("favorite-icon")) {
//     const parent = e.target.parentElement;
//     const name = parent.querySelector(".restaurant__name").textContent;
//   }
// });

document.body.addEventListener("click", handleBottomSheetToggle);

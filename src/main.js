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

// localStorage에서 restaurantList를 가져옵니다. 없으면 INITIAL_RESTAURANT로 초기화
let restaurantList = new RestaurantList(
  JSON.parse(localStorage.getItem("restaurantList")) || [...INITIAL_RESTAURANT]
);

// restaurantList 데이터를 localStorage에 저장합니다.
localStorage.setItem("restaurantList", JSON.stringify(restaurantList.List));

// 로컬 데이터가 있다면 UI에 추가합니다.
restaurantList.List.forEach((restaurantItem) =>
  restaurantListElement.appendChild(createRestaurantItem(restaurantItem))
);

// 모달 열기/닫기 토글 처리
function handleBottomSheetToggle(event) {
  const modal = document.querySelector(".modal");

  if (event.target.closest(".restaurant-add-button")) {
    modal.show();
  }

  if (event.target.closest(".modal-backdrop")) {
    modal.close();
  }
}

// 좋아요 버튼 토글 처리
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

// 음식점 추가 폼 제출 처리
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

// 클릭 이벤트 리스너 등록
document.body.addEventListener("click", (event) => {
  [handleBottomSheetToggle, handleFavoriteToggle].forEach((handler) =>
    handler(event)
  );
});

// 폼 제출 이벤트 리스너 등록
restaurantAddForm.addEventListener("submit", handleAddRestaurantFormSubmit);

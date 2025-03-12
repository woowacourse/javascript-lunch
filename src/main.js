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
import createRestaurantDescription from "./components/restaurant/restaurantDesciption.js";
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

if (localStorage.getItem("sort")) {
  handleSort(localStorage.getItem("sort"));

  document.getElementById("sorting-filter").value =
    localStorage.getItem("sort");
}

// 이것을 주석 처리 해서... behavior 작동 멈출수 있음.

// if (localStorage.getItem("favorite")) {
//   handleCombinedFilter(localStorage.getItem("favorite"));
//   document.getElementById("favorite-filter").value =
//     localStorage.getItem("favortie");
// }
// if (localStorage.getItem("filter")) {
//   handleCombinedFilter(localStorage.getItem("category"));
//   document.getElementById("category-filter").value =
//     localStorage.getItem("filter");
// }
// 모달 열기/닫기 토글 처리
function handleBottomSheetToggle(event) {
  const modal = document.querySelector(".form-modal");

  if (event.target.closest(".restaurant-add-button")) {
    modal.show();
  }

  if (event.target.closest(".modal-backdrop")) {
    modal.close();
  }
}
function handleDescriptionModalToggle(event) {
  if (event.target.classList.contains("favorite-icon")) return;
  const modal = document.querySelector(".description-modal");
  const descriptionContainer = document.querySelector(".description");

  if (event.target.closest(".restaurant")) {
    const parent = event.target.parentElement;
    const name = parent.querySelector(".restaurant__name").textContent;
    const descriptionDiv = createRestaurantDescription(
      restaurantList.searchRestaurant(name)
    );
    descriptionContainer.appendChild(descriptionDiv);
    modal.showModal();
  }

  // 모달 배경 클릭 시 모달 닫기
  if (event.target.closest(".modal-backdrop")) {
    while (descriptionContainer.firstChild) {
      descriptionContainer.removeChild(descriptionContainer.firstChild);
    }
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

  if (
    !restaurant.isFavorite &&
    document.querySelector('input[name="favoriteFilter"]:checked').value ===
      "favorite"
  ) {
    restaurantListElement.removeChild(parent.parentElement.parentElement);
  }

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
    const formModal = document.querySelector(".form-modal");
    restaurantAddForm.reset();
    formModal.close();
  } catch (error) {
    Toast.showToast(`${error.message}`, "error");
  }
}

// 정렬 리스트 2가지 경우 dataSet | array
// 유닛 테스트 작성
// 직접 넣고
function sortList(list, sortOption) {
  return list.sort((a, b) => {
    const nameA = a.name || a.dataset.name;
    const nameB = b.name || b.dataset.name;
    const distanceA = Number(a.distance || a.dataset.distance);
    const distanceB = Number(b.distance || b.dataset.distance);

    if (sortOption === "distance") {
      return distanceA - distanceB || nameA.localeCompare(nameB);
    }
    return nameA.localeCompare(nameB) || distanceA - distanceB;
  });
}

function handleSort(sortFor) {
  const restaurantItems = Array.from(restaurantListElement.children);

  localStorage.setItem("sort", sortFor);

  const sortedItems = sortList(restaurantItems, sortFor);

  sortedItems.forEach((item) => restaurantListElement.appendChild(item));
}

function handleCombinedFilter() {
  while (restaurantListElement.firstChild) {
    restaurantListElement.removeChild(restaurantListElement.firstChild);
  }

  const categoryFilter = document.getElementById("category-filter").value;
  const favoriteFilter = document.querySelector(
    'input[name="favoriteFilter"]:checked'
  ).value;

  let filteredList = restaurantList.List;

  if (favoriteFilter !== "all") {
    filteredList = filteredList.filter(({ isFavorite }) => isFavorite);
  }

  if (categoryFilter !== "전체") {
    filteredList = filteredList.filter(
      ({ category }) => category === categoryFilter
    );
  }

  const sortOption = localStorage.getItem("sort") || "name";
  const sortedList = sortList(filteredList, sortOption);

  sortedList.forEach((restaurantItem) =>
    restaurantListElement.appendChild(createRestaurantItem(restaurantItem))
  );
}

document.body.addEventListener("click", (event) => {
  [
    handleBottomSheetToggle,
    handleFavoriteToggle,
    handleDescriptionModalToggle,
  ].forEach((handler) => handler(event));
});
document
  .getElementById("category-filter")
  .addEventListener("change", handleCombinedFilter);
document
  .getElementById("favorite-filter")
  .addEventListener("change", handleCombinedFilter);

document
  .getElementById("sorting-filter")
  .addEventListener("change", (event) => {
    handleSort(event.target.value);
  });

// 폼 제출 이벤트 리스너 등록
restaurantAddForm.addEventListener("submit", handleAddRestaurantFormSubmit);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const dialogs = document.getElementsByTagName("dialog");
    if (dialogs.length > 0 && dialogs[0].open) {
      dialogs[0].close(); // esc로 닫기
    }
  }
});

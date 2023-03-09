import "../css/style.css";
import { getFoodCategoryMemberList } from "./type/FoodCategory";
import Modal from "./component/common/Modal";
import Restaurants from "./domain/Restaurants";
import RestaurantValidator from "./domain/RestaurantValidator";
import Alert from "./component/common/Alert";
import { $, $$ } from "./util/querySelector";
import Filter from "./domain/Filter";
import IMAGE from "./IMAGE";
import { sort } from "./domain/Sort";
import LocalStorage from "./util/LocalStorage";
import SelectInput from "./component/common/SelectInput";
import PersonalRestaurantInfo from "./component/domain/PersonalRestaurantInfo";
import RestaurantInputModal from "./component/domain/RestaurantInputModal";
import RestaurantInputSuccessModal from "./component/domain/RestaurantInputSuccessModal";
import ConfirmDeleteModal from "./component/domain/ConfirmDeleteModal";

const restaurantList = new Restaurants();
const renderRestaurants = new CustomEvent("renderRestaurants", { bubbles: true });

// 카테고리, 정렬 필터 생성
const filterContainer = $(".restaurant-filter-container");

const categoryFilterElement = SelectInput.create(
  "category-filter",
  "",
  ["전체", ...getFoodCategoryMemberList()],
  ["전체", ...getFoodCategoryMemberList()],
);
categoryFilterElement.setAttribute("class", "restaurant-filter");
filterContainer.appendChild(categoryFilterElement);

const sortingFilterElement = SelectInput.create(
  "sorting-filter",
  "",
  ["name", "distance"],
  ["이름순", "거리순"],
);
sortingFilterElement.setAttribute("class", "restaurant-filter");
filterContainer.appendChild(sortingFilterElement);

const categoryFilter = $("#category-filter");
const sortingFilter = $("#sorting-filter");

// 음식점 입력 모달 생성
const restaurantInputModal = RestaurantInputModal.create();

$("main").appendChild(restaurantInputModal);

const addButton = $(".gnb__button");
addButton.querySelector("img").src = IMAGE.ADD_BTN;
addButton.addEventListener("click", () => {
  $("#restaurant-input-form").reset();
  $$("#restaurant-input-form .alert").forEach((alert) => Alert.close(alert));
  Modal.open(restaurantInputModal);
});

// 음식점 입력 성공 모달 생성
const restaurantInputSuccessModal = RestaurantInputSuccessModal.create();
$("main").appendChild(restaurantInputSuccessModal);

// 음식점 삭제 확인 모달
const confirmDeleteModal = ConfirmDeleteModal.create();
$("main").appendChild(confirmDeleteModal);

const setupConfirmDeleteModal = (personalRestaurant) => {
  confirmDeleteModal.querySelector("h1").textContent = personalRestaurant.restaurant.name;

  confirmDeleteModal
    .querySelector("#delete-no")
    .addEventListener("click", () => Modal.close(confirmDeleteModal));

  confirmDeleteModal
    .querySelector("#delete-yes")
    .addEventListener("click", () => {
      restaurantList.remove(personalRestaurant);
      Modal.close(confirmDeleteModal);
      confirmDeleteModal.dispatchEvent(renderRestaurants);
    });
};

// 음식점 세부 정보 모달 생성
const restaurantDetailedModal = Modal.create("restaurant-detailed-modal");
$("main").appendChild(restaurantDetailedModal);

const makeOpenDetailedModalCallback = (personalRestaurant) => () => {
  const detailedElement = PersonalRestaurantInfo.createDetailedElement(personalRestaurant);

  detailedElement
    .querySelector(".button--primary")
    .addEventListener("click", () => Modal.close(restaurantDetailedModal));

  detailedElement
    .querySelector(".button--secondary")
    .addEventListener("click", () => {
      Modal.close(restaurantDetailedModal);

      setupConfirmDeleteModal(personalRestaurant);
      Modal.open(confirmDeleteModal);
    });

  Modal.setChildElement(restaurantDetailedModal, detailedElement);
  Modal.open(restaurantDetailedModal);
};

// 음식점 입력
const cancelButton = $("#new-restaurant-input .button--secondary");
const submitButton = $("#new-restaurant-input .button--primary");
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
const restaurantListContainer = $(".restaurant-list-container");

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

const getGlobalFilterResult = () => {
  const globalFilterValue = $("nav input[name='global-filter']:checked").value;

  if (globalFilterValue === "all") return restaurantList.getList();
  if (globalFilterValue === "favorite") return Filter.byFavorite(restaurantList.getList());
  return [];
};

const updateRestaurant = () => {
  $(".restaurant-list-container").innerHTML = "";

  LocalStorage.setItem("restaurants", restaurantList.getList());

  const globalFilteredList = getGlobalFilterResult();
  const sortResult = sort(sortingFilter.value, globalFilteredList);
  const filterResult = Filter.byCategory(categoryFilter.value, sortResult);

  filterResult.forEach((element) => {
    const summary = PersonalRestaurantInfo.createSummaryElement(element);
    restaurantListContainer.appendChild(summary);
    $(".restaurant-list-container")
      .lastElementChild
      .querySelector(".restaurant__info")
      .addEventListener("click", makeOpenDetailedModalCallback(element));
  });
};

$("#change-category-to-all").addEventListener("click", () => {
  categoryFilter.value = "전체";
  categoryFilter.dispatchEvent(renderRestaurants);
  Modal.close(restaurantInputSuccessModal);
});

$("#no-change-category").addEventListener("click", () => {
  Modal.close(restaurantInputSuccessModal);
});

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const restaurant = readRestaurantInput();

  try {
    RestaurantValidator.checkAll(restaurant);
  } catch (e) {
    Alert.open(submitAlert, e.message);
    return;
  }

  restaurantList.add({ restaurant, favorite: false });
  window.dispatchEvent(renderRestaurants);

  Modal.close(restaurantInputModal);

  if (categoryFilter.value !== "전체" && restaurant.category !== categoryFilter.value) {
    Modal.open(restaurantInputSuccessModal);
  }
});

// 새로고침
window.addEventListener("beforeunload", () => LocalStorage.setItem("restaurants", restaurantList.getList()));

window.onload = () => {
  LocalStorage.getItem("restaurants").forEach((item) => {
    restaurantList.add(item);
  });
  window.dispatchEvent(renderRestaurants);
};

// 필터
categoryFilter.addEventListener("change", (event) => {
  event.target.dispatchEvent(renderRestaurants);
});

sortingFilter.addEventListener("change", (event) => {
  event.target.dispatchEvent(renderRestaurants);
});

$("#global-filter-radio").addEventListener("change", (event) => {
  event.target.dispatchEvent(renderRestaurants);
});

window.addEventListener("favoriteChange", (event) => {
  event.target.dispatchEvent(renderRestaurants);
});

window.addEventListener("renderRestaurants", () => updateRestaurant());

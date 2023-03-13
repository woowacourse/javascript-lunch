import "../css/style.css";
import { getFoodCategoryMemberList } from "./type/FoodCategory";
import Alert from "./Alert/Alert";
import { $ } from "./util/querySelector";
import IMAGE from "./IMAGE";
import LocalStorage from "./util/LocalStorage";
import SelectInput from "./util/SelectInput";
import RestaurantInputModal from "./RestaurantInputModal/RestaurantInputModal";
import setRestaurantsTemplateToLocalStorage from "./setRestaurantsTemplateToLocalStorage";
import DocumentEventBus from "./DocumentEventBus/DocumentEventBus";
import RestaurantList from "./RestaurantList/RestaurantList";
import RestaurantDetailedModal from "./RestaurantDetailedModal/RestaurantDetailedModal";

const restaurantList = new RestaurantList();
$("main").appendChild(restaurantList.element);

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

categoryFilter.addEventListener("change", (event) => {
  event.target.dispatchEvent(new CustomEvent("updateList", { bubbles: true }));
});

sortingFilter.addEventListener("change", (event) => {
  event.target.dispatchEvent(new CustomEvent("updateList", { bubbles: true }));
});

$("#global-filter-radio").addEventListener("change", (event) => {
  event.target.dispatchEvent(new CustomEvent("updateList", { bubbles: true }));
});

// 음식점 입력 모달 생성
const restaurantInputModal = new RestaurantInputModal("restaurant-input-modal");
$("main").appendChild(restaurantInputModal.element);

const addButton = $(".gnb__button");
addButton.querySelector("img").src = IMAGE.ADD_BTN;
addButton.addEventListener("click", () => {
  restaurantInputModal.open();
});

// 음식점 입력 모달에 알람창 생성
const [
  categoryAlertPosition,
  nameAlertPosition,
  distanceAlertPosition,
  linkAlertPosition,
  submitAlertPosition,
] = restaurantInputModal.element.querySelectorAll(".alert-position");

const categoryAlert = new Alert("alert-category");
const nameAlert = new Alert("alert-category");
const distanceAlert = new Alert("alert-category");
const linkAlert = new Alert("alert-category");
const submitAlert = new Alert("alert-category");

categoryAlertPosition.appendChild(categoryAlert.element);
nameAlertPosition.appendChild(nameAlert.element);
distanceAlertPosition.appendChild(distanceAlert.element);
linkAlertPosition.appendChild(linkAlert.element);
submitAlertPosition.appendChild(submitAlert.element);

// 음식점 세부 정보 모달 생성
const restaurantDetailedModal = new RestaurantDetailedModal("restaurant-detailed-modal");
$("main").appendChild(restaurantDetailedModal.element);

// 이벤트 구독 관계 설정
DocumentEventBus.subscribe("validateCategory", categoryAlert.eventCallback.bind(categoryAlert));
DocumentEventBus.subscribe("validateName", nameAlert.eventCallback.bind(nameAlert));
DocumentEventBus.subscribe("validateDistance", distanceAlert.eventCallback.bind(distanceAlert));
DocumentEventBus.subscribe("validateLink", linkAlert.eventCallback.bind(linkAlert));
DocumentEventBus.subscribe("validateCategory", submitAlert.eventCallback.bind(submitAlert));
DocumentEventBus.subscribe("validateName", submitAlert.eventCallback.bind(submitAlert));
DocumentEventBus.subscribe("validateDistance", submitAlert.eventCallback.bind(submitAlert));
DocumentEventBus.subscribe("validateLink", submitAlert.eventCallback.bind(submitAlert));

DocumentEventBus.subscribe("restaurantSubmit", restaurantList.newRestaurantEventCallback.bind(restaurantList));
DocumentEventBus.subscribe("deleteRestaurant", restaurantList.deleteCallback.bind(restaurantList));
DocumentEventBus.subscribe("favoriteChange", restaurantList.favoriteChangeCallback.bind(restaurantList));
DocumentEventBus.subscribe("updateList", restaurantList.updateCallback.bind(restaurantList));

DocumentEventBus.subscribe(
  "openDetailed",
  restaurantDetailedModal.openModalEventCallback.bind(restaurantDetailedModal),
);

// 새로고침
window.addEventListener("beforeunload", () => LocalStorage.setItem("restaurants", restaurantList.getList()));

window.onload = () => {
  setRestaurantsTemplateToLocalStorage();

  LocalStorage.getItem("restaurants").forEach((item) => {
    restaurantList.add(item);
  });
  window.dispatchEvent(new CustomEvent("updateList", { bubbles: true }));
};

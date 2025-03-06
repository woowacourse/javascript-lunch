import AddRestaurantModal from "./components/AddRestaurantModal.js";
import Header from "./components/Header.js";
import RestaurantItem from "./components/RestaurantItem.js";
import RestaurantList from "./components/RestaurantList.js";

addEventListener("load", () => {
  const headerContainer = document.querySelector(".gnb");
  Header(headerContainer);
  const restaurantListContainer = document.querySelector(
    ".restaurant-list-container"
  );
  RestaurantList(restaurantListContainer);

  const modalButton = document.getElementById("gnb-button");
  const appContainer = document.getElementById("app");

  modalButton.addEventListener("click", () => {
    AddRestaurantModal(appContainer);

    appContainer.innerHTML += modal;
    // 1. 모달창에서 입력값을 받아오고

    // 카테고리 아이콘 매핑
    const categoryMapping = {
      한식: "korean",
      중식: "chinese",
      일식: "japanese",
      양식: "western",
      아시안: "asian",
      기타: "etc",
    };

    const $addRestaurantButton = document.querySelector(".button--primary");
    $addRestaurantButton.addEventListener("click", (e) => {
      e.preventDefault();

      const categoryValue = document.getElementById("category").value || "기타";
      const nameValue = document.getElementById("name").value;
      const distanceValue = document.getElementById("distance").value;
      const descriptionValue = document.getElementById("description").value;

      const categoryCode = categoryMapping[categoryValue] || "etc";

      const inputValue = {
        categoryCode,
        nameValue,
        distanceValue,
        descriptionValue,
      };

      const restaurantList = document.querySelector(".restaurant-list");

      RestaurantItem(restaurantList, inputValue);

      document.querySelector(".modal").remove();
    });
  });
});

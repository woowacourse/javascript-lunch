import { RESTAURANTS } from "./types/Constant";
import { createHeader } from "./components/Header";
import { createRestaurantItem } from "./components/RestaurantItem";
import Modal from "./components/Modal";

addEventListener("load", () => {
  const body = document.querySelector("body");
  const restaurantList = document.querySelector(".restaurant-list");
  const main = document.querySelector("main");

  const innerModalContent = document.createElement("div");
  innerModalContent.innerHTML = /*html*/ `
        <h2>주렁 추가</h2>
        이름: <input type="text" >
        닉네임: <input type="text" >
  `;

  const restaurantDetailModalContent = document.createElement("div");
  restaurantDetailModalContent.append(createRestaurantItem(RESTAURANTS[0]));

  const modal = new Modal({ element: innerModalContent });
  main.append(modal.rendered);

  const restaurantDetailModal = new Modal({
    element: restaurantDetailModalContent,
  });
  restaurantDetailModal.toggle();
  main.append(restaurantDetailModal.rendered);

  const toggleModal = () => {
    modal.toggle();
  };
  const header = createHeader({ title: "점심 뭐 먹지", onClick: toggleModal });
  header.classList.add("gnb");
  body.prepend(header);

  // 식당 아이템 불러오기 마이그레이션 완료

  const restaurantItems = document.createDocumentFragment();

  RESTAURANTS.forEach((restaurant) => {
    restaurantItems.append(createRestaurantItem(restaurant));
  });

  restaurantList.append(restaurantItems);
});

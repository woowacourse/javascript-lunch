import { RESTAURANTS } from "./types/Constant";
import { createHeader } from "./components/Header";
import RestaurantItem from "./components/RestaurantItem";
import Modal from "./components/Modal";

const body = document.querySelector("body");
const restaurantList = document.querySelector(".restaurant-list");
const main = document.querySelector("main");

// 식당 목록 추가 모달에서 보여야 할 항목
const innerModalContent = document.createElement("div");
innerModalContent.innerHTML = /*html*/ `
      <h2>주렁 추가</h2>
      이름: <input type="text" >
      닉네임: <input type="text" >
`;

const modal = new Modal({ element: innerModalContent });
main.append(modal.rendered);

// 식당 아이템을 클릭하면 보여야 할 상세 정보
const restaurantDetailModalContent = document.createElement("div");
const modalDetailItem = new RestaurantItem(RESTAURANTS[0], null, true);
restaurantDetailModalContent.append(modalDetailItem.element);

addEventListener("load", () => {
  const restaurantDetailModal = new Modal({
    element: restaurantDetailModalContent,
  });
  main.append(restaurantDetailModal.rendered);

  // 식당 아이템 불러오기 마이그레이션 완료

  const restaurantItems = document.createDocumentFragment();

  const onItemClick = (restaurantItem) => {
    /* 🤔 생각해보기: 콜백 함수에서 restaurant는 어떻게 넘어오는가? */
    console.log(restaurantItem.restaurant);

    modalDetailItem.update(restaurantItem.restaurant);
    restaurantDetailModal.toggle();
  };

  RESTAURANTS.forEach((restaurant) => {
    restaurantItems.append(new RestaurantItem(restaurant, onItemClick).element);
  });

  restaurantList.append(restaurantItems);

  //////////
  const toggleModal = () => {
    modal.toggle();
  };

  const header = createHeader({ title: "점심 뭐 먹지", onClick: toggleModal });
  header.classList.add("gnb");
  body.prepend(header);
});

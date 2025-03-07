import { createHeader } from "./components/Header";
import { createRestaurantItem } from "./components/RestaurantItem";

addEventListener("load", () => {
  const body = document.querySelector("body");
  const restaurantList = document.querySelector(".restaurant-list");

  const header = createHeader({ title: "점심 뭐 먹지" });
  header.classList.add("gnb");
  body.prepend(header);

  //////// 다음 컴포넌트
  const restaurantItem = createRestaurantItem();
  restaurantList.append(restaurantItem);
});

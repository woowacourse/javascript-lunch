import { $ } from "../utils/dom";

const renderRestaurants = (restaurantCardList) => {
  const ulTag = $(".restaurant-list");
  ulTag.innerHTML = "";

  restaurantCardList.forEach((restaurantCard) => {
    ulTag.appendChild(restaurantCard);
  });
};

export default renderRestaurants;

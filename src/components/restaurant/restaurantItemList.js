import $restaurantItem from "./restaurantItem";

const $restaurantList = (restaurantItems) => {
  if (restaurantItems.length > 0) {
    const restaurantList = document.createElement("ul");
    restaurantList.classList.add("restaurant-list");

    restaurantItems.forEach((item) => {
      restaurantList.appendChild($restaurantItem(item));
    });

    return restaurantList;
  }

  const noRestaurant = document.createElement("div");
  noRestaurant.classList.add("no-restaurant");

  const noRestaurantIcon = document.createElement("i");
  noRestaurantIcon.textContent = "🍽️";
  const noRestaurantText = document.createElement("b");
  noRestaurantText.textContent = "등록된 음식점이 없습니다.";

  noRestaurant.appendChild(noRestaurantIcon);
  noRestaurant.appendChild(noRestaurantText);

  return noRestaurant;
};

export default $restaurantList;

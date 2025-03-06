import { FOOD_CATEGORY } from "../../constants/foodCategory";
import Image from "./image";
import RestaurantInfo from "./restaurantInfo";

const RestaurantCard = (restaurant) => {
  const { category, name, distance, description, link } = restaurant.info;
  const restaurantCard = document.createElement("li");
  restaurantCard.classList.add("restaurant");

  // 카테고리 이미지 추가
  const categoryImageContainer = document.createElement("div");
  categoryImageContainer.classList.add("restaurant__category");
  restaurantCard.prepend(categoryImageContainer);

  const src = `./category-${FOOD_CATEGORY[category]}.png`;

  categoryImageContainer.appendChild(Image(src, category, "category-icon"));

  // 식당 정보 추가
  restaurantCard.appendChild(RestaurantInfo({ name, distance, description }));

  return restaurantCard;
};

export default RestaurantCard;

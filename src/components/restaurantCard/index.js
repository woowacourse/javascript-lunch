import CategoryImage from "./categoryImage";
import RestaurantInfo from "./restaurantInfo";

const RestaurantCard = (restaurant) => {
  const { category, name, distance, description } = restaurant.info;
  const restaurantCard = document.createElement("li");
  restaurantCard.classList.add("restaurant");

  restaurantCard.prepend(CategoryImage(category));
  restaurantCard.appendChild(RestaurantInfo({ name, distance, description }));

  return restaurantCard;
};

export default RestaurantCard;

import CategoryImage from "./categoryImage";
import RestaurantInfo from "./restaurantInfo";

const RestaurantCard = (restaurant) => {
  const { category, name, distance, description, favorite } = restaurant.info;

  const restaurantCard = document.createElement("li");
  restaurantCard.classList.add("restaurant");

  restaurantCard.prepend(CategoryImage(category));
  restaurantCard.appendChild(
    RestaurantInfo({
      name,
      distance,
      description,
      favorite,
      toggleFavoriteMark: restaurant.toggleFavoriteMark,
    })
  );

  return restaurantCard;
};

export default RestaurantCard;

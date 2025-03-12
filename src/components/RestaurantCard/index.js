import createElement from "../../utils/createElement/createElement";
import CategoryImage from "./CategoryImage";
import RestaurantInfo from "./RestaurantInfo";

const RestaurantCard = (restaurant) => {
  const { category, name, distance, description } = restaurant.value;

  const restaurantCard = createElement({
    tagName: "li",
    classNames: ["restaurant"],
    children: [CategoryImage(category), RestaurantInfo(restaurant.value)],
  });

  return restaurantCard;
};

export default RestaurantCard;

import createElement from "../../utils/createElement/createElement";
import CategoryImage from "./categoryImage";
import RestaurantInfo from "./restaurantInfo";

const RestaurantCard = (restaurant) => {
  const { category, name, distance, description } = restaurant.info;

  const restaurantCard = createElement({
    tagName: "li",
    classNames: ["restaurant"],
    children: [CategoryImage(category), RestaurantInfo(restaurant.info)],
  });

  return restaurantCard;
};

export default RestaurantCard;

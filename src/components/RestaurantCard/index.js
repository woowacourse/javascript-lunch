import createElement from "../../utils/createElement/createElement";
import Image from "../common/Image";
import CategoryImage from "./CategoryImage";
import FavoriteIcon from "./FavoriteIcon";
import RestaurantInfo from "./RestaurantInfo";

const RestaurantCard = (restaurant) => {
  const { category, name, distance, description } = restaurant.value;

  const restaurantCard = createElement({
    tagName: "li",
    classNames: ["restaurant"],
    children: [
      CategoryImage(category),
      RestaurantInfo(restaurant.value),
      FavoriteIcon(),
    ],
  });

  return restaurantCard;
};

export default RestaurantCard;

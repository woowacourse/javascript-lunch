import createElement from "../../utils/createElement/createElement";
import { $ } from "../../utils/dom";
import Image from "../common/Image";
import RestaurantInfo from "./RestaurantInfo";
import CategoryImage from "./CategoryImage";
import FavoriteIcon from "./FavoriteIcon";
import RestaurantDetail from "../RestaurantDetail";

const RestaurantCard = (restaurant, events) => {
  const { category, name, distance, description } = restaurant.value;
  const { clickFavorite, clickCard } = events;

  const restaurantCard = createElement({
    tagName: "li",
    classNames: ["restaurant"],
    children: [
      CategoryImage(category),
      RestaurantInfo(restaurant.value),
      FavoriteIcon(restaurant, clickFavorite),
    ],
    events: {
      click: () => {
        console.log(`${name} 클릭`);
        clickCard(restaurant);
      },
    },
  });

  return restaurantCard;
};

export default RestaurantCard;

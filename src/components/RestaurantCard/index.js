import createElement from "../../utils/createElement/createElement";
import { $ } from "../../utils/dom";
import Image from "../common/Image";
import RestaurantInfo from "./RestaurantInfo";
import CategoryImage from "./CategoryImage";
import FavoriteIcon from "./FavoriteIcon";

const RestaurantCard = (restaurant, events = {}) => {
  const { category, name, distance, description } = restaurant.value;
  const { clickFavorite, clickCard } = events;
  console.log("카드 생성");
  console.log("clickCard", clickCard);

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
        clickCard(restaurant);
      },
    },
  });

  return restaurantCard;
};

export default RestaurantCard;

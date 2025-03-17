import createElement from "../../utils/createElement/createElement";
import RestaurantInfo from "./RestaurantInfo";
import CategoryImage from "./CategoryImage";
import FavoriteIcon from "./FavoriteIcon";

const RestaurantCard = (restaurant, events = {}) => {
  const { category } = restaurant.value;
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
        clickCard(restaurant);
      },
    },
  });

  return restaurantCard;
};

export default RestaurantCard;

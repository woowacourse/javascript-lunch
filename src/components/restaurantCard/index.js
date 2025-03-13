import { createElement } from "../../utils/createElement";
import { $ } from "../../utils/dom";
import ModalContent from "../common/modal/modalContent";
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
      description: [description, true],
      favorite,
      toggleFavoriteMark: restaurant.toggleFavoriteMark,
      handleClickTitle,
    })
  );

  function handleClickTitle() {
    $(".modal-backdrop").classList.add("open");

    ModalContent([
      CategoryImage(category),
      createElement(`<div class="space"></div>`),
      RestaurantInfo({
        name,
        distance,
        description: [description, false],
        favorite,
        toggleFavoriteMark: restaurant.toggleFavoriteMark,
      }),
    ]);
  }
  return restaurantCard;
};

export default RestaurantCard;

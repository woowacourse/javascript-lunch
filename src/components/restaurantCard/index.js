import { BUTTON_TEXT } from "../../constants/buttonText";
import { createElement } from "../../utils/createElement";
import { $ } from "../../utils/dom";
import Button from "../common/button";
import ButtonContainer from "../common/buttonContainer";
import { modalCloseAndFilter } from "../common/modal/handleCloseModal";
import ModalContent from "../common/modal/modalContent";
import Space from "../common/space";
import CategoryImage from "./categoryImage";
import RestaurantInfo from "./restaurantInfo";

const RestaurantCard = (restaurant, filter, deleteRestaurant) => {
  const { id, category, name, distance, description, favorite } =
    restaurant.info;
  const restaurantCard = document.createElement("li");
  restaurantCard.classList.add("restaurant");

  restaurantCard.prepend(CategoryImage(category));
  restaurantCard.appendChild(
    RestaurantInfo({
      id,
      name,
      distance,
      description: [description, true],
      favorite,
      toggleFavoriteMark: () => {
        restaurant.toggleFavoriteMark();
        filter();
      },
      handleClickTitle: () =>
        handleClickTitle(restaurant, filter, deleteRestaurant),
    })
  );

  return restaurantCard;
};

function handleClickTitle(restaurant, filter, deleteRestaurant) {
  const { category, name, distance, description, favorite, link } =
    restaurant.info;

  $(".modal-backdrop").classList.add("open");
  ModalContent([
    CategoryImage(category),
    Space(),
    RestaurantInfo({
      name,
      distance,
      description: [description, false],
      favorite,
      toggleFavoriteMark: restaurant.toggleFavoriteMark,
    }),
    createElement(
      /*html*/ `<a href=${link} class="restaurant__link">${link}</a>`
    ),
    ButtonContainer([
      Button({
        text: BUTTON_TEXT.DELETE,
        style: "button--secondary",
        onClick: () => {
          const isConfirm = confirm("정말 삭제하시겠습니까?");
          if (isConfirm) {
            deleteRestaurant(restaurant.info.id);
            modalCloseAndFilter(filter);
          }
        },
        type: "button",
        id: "delete-button",
      }),
      Button({
        text: BUTTON_TEXT.CLOSE,
        style: "button--primary",
        onClick: () => modalCloseAndFilter(filter),
        id: "close-button",
      }),
    ]),
  ]);
}

export default RestaurantCard;

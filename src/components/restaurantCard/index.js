import { BUTTON_TEXT } from "../../constants/buttonText";
import { createElement } from "../../utils/createElement";
import { $ } from "../../utils/dom";
import Button from "../common/button";
import ButtonContainer from "../common/buttonContainer";
import { modalClose } from "../common/modal/handleCloseModal";
import ModalContent from "../common/modal/modalContent";
import Space from "../common/space";
import RestaurantList from "../restaurantList";
import CategoryImage from "./categoryImage";
import RestaurantInfo from "./restaurantInfo";

const RestaurantCard = (
  restaurantData,
  restaurantsInstance,
  filterInstance
) => {
  const { id, category, name, distance, description, favorite } =
    restaurantData.info;
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
        restaurantData.toggleFavoriteMark();
        RestaurantList(restaurantsInstance, filterInstance);
      },
      handleClickTitle: () =>
        handleClickTitle(restaurantData, restaurantsInstance, filterInstance),
    })
  );

  return restaurantCard;
};

function handleClickTitle(restaurantData, restaurantsInstance, filterInstance) {
  const { category, name, distance, description, favorite, link } =
    restaurantData.info;
  $(".modal-backdrop").classList.add("open");
  ModalContent([
    CategoryImage(category),
    Space(),
    RestaurantInfo({
      name,
      distance,
      description: [description, false],
      favorite,
      toggleFavoriteMark: restaurantData.toggleFavoriteMark,
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
            restaurantsInstance.deleteRestaurant(restaurantData.info.id);
            RestaurantList(restaurantsInstance, filterInstance);
            modalClose();
          }
        },
        type: "button",
        id: "delete-button",
      }),
      Button({
        text: BUTTON_TEXT.CLOSE,
        style: "button--primary",
        onClick: () => {
          modalClose();
          RestaurantList(restaurantsInstance, filterInstance);
        },
        id: "close-button",
      }),
    ]),
  ]);
}

export default RestaurantCard;

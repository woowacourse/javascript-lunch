import AllRestaurantList, {
  deleteRestaurant,
} from "../../../domain/AllRestaurantList";
import {
  createCategoryDiv,
  createDescriptionPTag,
  createDistanceSpan,
  createLinkDiv,
  createNameH3Tag,
} from "../generateRestaurantItem";

import Modal from "./Modal";
import RestaurantList from "../../../domain/RestaurantList";
import createElementByTag from "../../utils/createElementByTag";
import generateFavoriteButton from "../Button/generateFavoritesButton";
import generatePrimaryButton from "../Button/generatePrimaryButton";
import generateSecondaryButton from "../Button/generateSecondaryButton";
import { renderFilteredContainer } from "../../..";

class RestaurantDetailModal extends Modal {
  constructor(restaurant: Restaurant) {
    super(DetailModalChildren(restaurant));
  }
}

const DetailModalChildren = (restaurant: Restaurant) => {
  const { category, name, distance, description, link, favorites } = restaurant;
  const categoryDiv = createCategoryDiv(category);
  const nameH3 = createNameH3Tag(name);
  const distanceSpan = createDistanceSpan(distance);
  const descriptionP = createDescriptionPTag(description);
  const linkDiv = createLinkDiv(link);
  const favoritesButton = generateFavoriteButton({
    isFavorites: favorites,
    restaurantName: name,
    onClickHandler: () => {
      const restaurantContainer = document.querySelector(
        ".restaurant-list-container"
      );

      const restaurantList =
        restaurantContainer?.getAttribute("id") ===
        "restaurant-all-list-container"
          ? AllRestaurantList
          : new RestaurantList(AllRestaurantList.withFavorites());

      renderFilteredContainer(restaurantContainer, restaurantList);
    },
  });

  const restaurantInfoDiv = createElementByTag({
    tag: "div",
    classes: ["restaurant__detail"],
    attribute: { name: name },
  });
  const categoryAndFavoriteDiv = createElementByTag({
    tag: "div",
    classes: ["restaurant__detail__category_and_favorite"],
  });
  categoryAndFavoriteDiv.append(categoryDiv, favoritesButton);
  restaurantInfoDiv.append(
    categoryAndFavoriteDiv,
    nameH3,
    distanceSpan,
    descriptionP,
    linkDiv
  );

  const buttonDiv = createElementByTag({
    tag: "div",
    classes: ["button-container"],
  });
  const deleteButton = generateSecondaryButton({
    value: "삭제하기",
    onClickHandler: (e) => {
      if (e.target instanceof HTMLElement) {
        const restaurantInfoDiv =
          e.target.closest(".modal-container")?.firstChild;
        if (restaurantInfoDiv instanceof HTMLElement) {
          const name = restaurantInfoDiv.getAttribute("name");

          if (!name) {
            throw new Error("[ERROR] name is invalid");
          }

          if (window.confirm("이 음식점을 정말 삭제하시겠습니까?")) {
            deleteRestaurant(name);
          }

          const restaurantContainer = document.querySelector(
            ".restaurant-list-container"
          );

          const restaurantList =
            restaurantContainer?.getAttribute("id") ===
            "restaurant-all-list-container"
              ? AllRestaurantList
              : new RestaurantList(AllRestaurantList.withFavorites());

          renderFilteredContainer(restaurantContainer, restaurantList);
        }
        e.target.closest(".modal")?.classList.remove("modal--open");
      }
    },
  });
  const closeButton = generatePrimaryButton({
    value: "닫기",
    onClickHandler: (e) => {
      if (e.target instanceof HTMLElement) {
        e.target.closest(".modal")?.classList.remove("modal--open");
      }
    },
  });

  buttonDiv.append(deleteButton, closeButton);

  return [restaurantInfoDiv, buttonDiv];
};

export default RestaurantDetailModal;

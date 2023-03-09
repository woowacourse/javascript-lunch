import IMAGE from "../IMAGE";
import RestaurantInfo from "./RestaurantInfo";

const createFavoriteButton = (isFilled) => {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("class", "favorite-button");

  const image = document.createElement("img");
  image.src = isFilled ? IMAGE.FILLED_STAR_BTN : IMAGE.EMPTY_STAR_BTN;
  button.appendChild(image);

  return button;
};

const favoriteChangeEvent = new CustomEvent("favoriteChange", { bubbles: true });

const createElementAndButton = (personalRestaurant, createFn) => {
  const element = createFn(personalRestaurant.restaurant);
  const button = createFavoriteButton(personalRestaurant.favorite);

  button.addEventListener("click", () => {
    personalRestaurant.favorite = !personalRestaurant.favorite;

    button.firstElementChild.src = (
      personalRestaurant.favorite ? IMAGE.FILLED_STAR_BTN : IMAGE.EMPTY_STAR_BTN
    );

    button.dispatchEvent(favoriteChangeEvent);
  });

  return { element, button };
};

const PersonalRestaurantInfo = {
  createSummaryElement(personalRestaurant) {
    const { element, button } = createElementAndButton(
      personalRestaurant,
      RestaurantInfo.createSummaryElement,
    );

    element.querySelector(".restaurant").appendChild(button);

    return element;
  },

  createDetailedElement(personalRestaurant) {
    const { element, button } = createElementAndButton(
      personalRestaurant,
      RestaurantInfo.createDetailedElement,
    );

    element.prepend(button);

    return element;
  },
};

export default PersonalRestaurantInfo;

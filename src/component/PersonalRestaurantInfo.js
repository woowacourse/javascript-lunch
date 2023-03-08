import IMAGE from "../IMAGE";
import RestaurantInfo from "./RestaurantInfo";

const createFavoriteButton = (isFilled) => {
  const button = document.createElement("button");
  button.setAttribute("type", "button");

  const image = document.createElement("img");
  image.src = isFilled ? IMAGE.FILLED_STAR_BTN : IMAGE.EMPTY_STAR_BTN;
  button.appendChild(image);

  return button;
};

const favoriteChangeEvent = new CustomEvent("favoriteChange", { bubbles: true });

const PersonalRestaurantInfo = {
  createSummaryElement(personalRestaurant) {
    const summary = RestaurantInfo.createSummaryElement(personalRestaurant.restaurant);
    const button = createFavoriteButton(personalRestaurant.favorite);
    summary.prepend(button);

    button.addEventListener("click", () => {
      personalRestaurant.favorite = !personalRestaurant.favorite;

      button.firstElementChild.src = (
        personalRestaurant.favorite ? IMAGE.FILLED_STAR_BTN : IMAGE.EMPTY_STAR_BTN
      );

      button.dispatchEvent(favoriteChangeEvent);
    });
    return summary;
  },

  createDetailedElement(personalRestaurant) {
    const detailed = RestaurantInfo.createDetailedElement(personalRestaurant.restaurant);
    const button = createFavoriteButton(personalRestaurant.favorite);
    detailed.prepend(button);

    button.addEventListener("click", () => {
      personalRestaurant.favorite = !personalRestaurant.favorite;

      button.firstElementChild.src = (
        personalRestaurant.favorite ? IMAGE.FILLED_STAR_BTN : IMAGE.EMPTY_STAR_BTN
      );

      button.dispatchEvent(favoriteChangeEvent);
    });
    return detailed;
  },
};

export default PersonalRestaurantInfo;

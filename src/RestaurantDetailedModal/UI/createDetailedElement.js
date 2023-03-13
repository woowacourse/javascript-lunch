import TEMPLATE from "./template";
import IMAGE from "../../IMAGE";
import createFavoriteButton from "./createFavoriteButton";

const createDetailedElement = ({ restaurant, favorite }) => {
  const element = document.createElement("div");
  element.setAttribute("class", "detailed-info");

  element.innerHTML = TEMPLATE;

  element.querySelector(".restaurant__name").textContent = restaurant.name;
  element.querySelector(".restaurant__distance").textContent = `${restaurant.estimatedTime}분 내`;
  element.querySelector(".restaurant__description").textContent = restaurant.description;
  element.querySelector(".category-icon").src = IMAGE[restaurant.category];

  const favoriteButton = createFavoriteButton(favorite);
  element.prepend(favoriteButton);

  return element;
};

export default createDetailedElement;

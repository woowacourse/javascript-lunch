import TEMPLATE from "./template";
import IMAGE from "../../IMAGE";
import createFavoriteButton from "./createFavoriteButton";

const createSummaryElement = ({ restaurant, favorite }) => {
  const element = document.createElement("li");
  element.setAttribute("class", "restaurant");

  element.innerHTML = TEMPLATE;
  element.querySelector(".restaurant__name").textContent = restaurant.name;
  element.querySelector(".restaurant__distance").textContent = `${restaurant.estimatedTime}분 내`;
  element.querySelector(".restaurant__description").textContent = restaurant.description;
  element.querySelector(".category-icon").src = IMAGE[restaurant.category];

  const favoriteButton = createFavoriteButton(favorite);
  element.appendChild(favoriteButton);

  return element;
};

export default createSummaryElement;

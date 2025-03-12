import { createElement } from "../../utils/createElement";
import Title from "../common/title";
import Description from "./description";
import Distance from "./distance";

const RestaurantInfo = ({
  name,
  distance,
  description,
  favorite,
  toggleFavoriteMark,
}) => {
  const restaurantInfo = document.createElement("div");
  restaurantInfo.classList.add("restaurant__info");

  restaurantInfo.appendChild(
    Title(name, "h3", "restaurant__name", "text-subtitle")
  );
  restaurantInfo.appendChild(Distance(distance));
  restaurantInfo.appendChild(Description(description, true));

  const favoriteMark = createElement(/*html*/ `
      <div class="restaurant__favorite-mark">${favorite ? "★" : "☆"}</div>
  `);

  favoriteMark.addEventListener("click", () => {
    const favorite = toggleFavoriteMark();
    favoriteMark.innerHTML = favorite ? "★" : "☆";
  });

  restaurantInfo.appendChild(favoriteMark);

  return restaurantInfo;
};
export default RestaurantInfo;

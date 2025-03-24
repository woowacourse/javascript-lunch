import { createElement } from "../../utils/createElement";
import Title from "../common/title";
import Description from "./description";
import Distance from "./distance";

const RestaurantInfo = ({
  id,
  name,
  distance,
  description,
  favorite,
  toggleFavoriteMark,
  handleClickTitle,
}) => {
  const restaurantInfo = document.createElement("div");
  restaurantInfo.classList.add("restaurant__info");
  restaurantInfo.setAttribute("id", `restaurant__info__${id}`);

  restaurantInfo.appendChild(
    Title({
      text: name,
      tagName: "h3",
      className: ["restaurant__name", "text-subtitle"],
      handleClickTitle: handleClickTitle,
    })
  );
  restaurantInfo.appendChild(Distance(distance));
  restaurantInfo.appendChild(Description(description[0], description[1]));

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

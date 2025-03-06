import Title from "../common/title";
import Distance from "./distance";

const RestaurantInfo = ({ name, distance, description }) => {
  const restaurantInfo = document.createElement("div");
  restaurantInfo.classList.add("restaurant__info");

  // restaurantInfo.innerHTML = `
  // <p class="restaurant__description text-body">
  //   ${description}
  // </p>`;

  restaurantInfo.appendChild(
    Title(name, "h3", "restaurant__name", "text-subtitle")
  );
  restaurantInfo.appendChild(Distance(distance));

  return restaurantInfo;
};
export default RestaurantInfo;

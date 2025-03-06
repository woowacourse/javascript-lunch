import Title from "../common/title";
import Description from "./description";
import Distance from "./distance";

const RestaurantInfo = ({ name, distance, description }) => {
  const restaurantInfo = document.createElement("div");
  restaurantInfo.classList.add("restaurant__info");

  restaurantInfo.appendChild(
    Title(name, "h3", "restaurant__name", "text-subtitle")
  );
  restaurantInfo.appendChild(Distance(distance));
  restaurantInfo.appendChild(Description(description, true));

  return restaurantInfo;
};
export default RestaurantInfo;

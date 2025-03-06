import Title from "../../common/title";

const RestaurantInfo = ({ name, distance, description }) => {
  const restaurantInfo = document.createElement("div");
  restaurantInfo.classList.add("restaurant__info");
  const title = Title(name, "h3", "restaurant__name", "text-subtitle");

  restaurantInfo.innerHTML = `<span class="restaurant__distance text-body"
      >캠퍼스부터 ${distance}분 내</span
    >
    <p class="restaurant__description text-body">
     ${description}
    </p>`;

  restaurantInfo.prepend(title);

  return restaurantInfo;
};
export default RestaurantInfo;

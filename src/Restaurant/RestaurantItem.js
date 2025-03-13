import { IMAGE_SRC_BY_RESTAURANTS_CATEGORY } from "../constants/constants.js";
import RestaurantDetailModal from "../components/Modal/Modal/RestaurantDetailModal.js";
const renderRestaurantElement = ({
  category,
  name,
  distance,
  description,
  link,
}) => {
  const li = document.createElement("li");
  li.classList.add("restaurant");
  const restaurant = { category, name, distance, description, link };
  li.addEventListener("click", () => {
    const restaurantDetailModal = new RestaurantDetailModal(restaurant);
    restaurantDetailModal.open();
  });

  const mappedImage =
    IMAGE_SRC_BY_RESTAURANTS_CATEGORY[category] || "images/default.png";

  li.innerHTML = `
      <div class="restaurant__category">
        <img class="category-icon" />
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle"></h3>
        <span class="restaurant__distance text-body"></span>
        <p class="restaurant__description text-body"></p>
      </div>
    `;

  li.querySelector(".category-icon").src = mappedImage;
  li.querySelector(".category-icon").alt = category;
  li.querySelector(".restaurant__name").textContent = name;
  li.querySelector(
    ".restaurant__distance"
  ).textContent = `캠퍼스로부터 ${distance}분 내`;
  li.querySelector(".restaurant__description").textContent = description;

  return li;
};

export default renderRestaurantElement;

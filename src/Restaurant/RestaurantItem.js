import { IMAGE_SRC_BY_RESTAURANTS_CATEGORY } from "../constants/constants.js";
import RestaurantDetailModal from "../components/Modal/Modal/RestaurantDetailModal.js";
import { clickStar } from "../components/StarIcon/star.js";

const renderRestaurantElement = (
  { category, name, distance, description, link, isFavorite },
  updateFavoriteStatus,
  deleteRestaurant
) => {
  const li = document.createElement("li");
  li.classList.add("restaurant");
  const restaurant = {
    category,
    name,
    distance,
    description,
    link,
    isFavorite,
  };

  li.addEventListener("click", (e) => {
    const starIcon = e.target.closest(".star-icon");
    // falsy -> "", 0, undefined, null
    // truthy -> falsy 아닌 값들 전체 다
    if (starIcon) {
      starIcon.src = !restaurant.isFavorite
        ? "images/star.png"
        : "images/empty-star.png";

      restaurant.isFavorite = !restaurant.isFavorite;
      updateFavoriteStatus(name);

      return;
    }

    const restaurantDetailModal = new RestaurantDetailModal(
      restaurant,
      (name) => updateFavoriteStatus(name),
      (name) => deleteRestaurant(name)
    );
    restaurantDetailModal.open();
  });

  const mappedImage =
    IMAGE_SRC_BY_RESTAURANTS_CATEGORY[category] || "images/default.png";

  li.innerHTML = `
    <div class="restaurant__box">
      <div class="restaurant__category">
        <img class="category-icon" />
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle"></h3>
        <span class="restaurant__distance text-body"></span>
        <p class="restaurant__description text-body"></p>
      </div>
    </div>
    <div class="favorite">${clickStar(isFavorite)}</div>
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

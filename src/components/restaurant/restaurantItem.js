import $createRestaurantInfo from "../restaurant/createRestaurantInfo";
import { $favoriteIcon, updateFavoriteIcon } from "../common/favoriteIcon.js";

const $restaurantCategory = ({ categoryIcon, categoryTitle }) => {
  const category = document.createElement("div");
  category.classList.add("restaurant__category");

  const categoryImage = document.createElement("img");
  categoryImage.src = categoryIcon;
  categoryImage.alt = categoryTitle;
  categoryImage.classList.add("category-icon");
  category.appendChild(categoryImage);

  return category;
};

const $restaurantInfo = ({ name, distance, description }) => {
  const info = document.createElement("div");
  info.classList.add("restaurant__info");

  const InfoName = document.createElement("h3");
  InfoName.classList.add("restaurant__name", "text-subtitle");
  InfoName.textContent = name;
  info.appendChild(InfoName);

  const InfoDistance = document.createElement("span");
  InfoDistance.classList.add("restaurant__distance", "text-body");
  InfoDistance.textContent = `캠퍼스부터 ${distance}분 내`;
  info.appendChild(InfoDistance);

  const InfoDescription = document.createElement("p");
  InfoDescription.classList.add("restaurant__description", "text-body");
  InfoDescription.textContent = description;
  info.appendChild(InfoDescription);

  return info;
};

const $restaurantItem = (restaurantInfo) => {
  const restaurantItem = document.createElement("li");
  restaurantItem.classList.add("restaurant");
  restaurantItem.dataset.id = restaurantInfo.id;

  restaurantItem.appendChild($restaurantCategory(restaurantInfo));
  restaurantItem.appendChild($restaurantInfo(restaurantInfo));
  restaurantItem.addEventListener("click", () =>
    $createRestaurantInfo(restaurantInfo)
  );
  const favoriteIcon = $favoriteIcon(restaurantInfo.isFavorite);
  favoriteIcon.addEventListener("click", (e) => {
    e.stopPropagation();

    updateFavoriteIcon(restaurantInfo, e);
  });
  restaurantItem.appendChild(favoriteIcon);
  return restaurantItem;
};

export default $restaurantItem;

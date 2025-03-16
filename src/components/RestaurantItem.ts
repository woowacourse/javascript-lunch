import { IMAGE_SRC_BY_RESTAURANTS_CATEGORY } from "../constants/constants";
import { Restaurant } from "../types/restaurant.ts";

const createRestaurantItem = ({
  category,
  name,
  distance,
  description,
}: Restaurant) => {
  const li = document.createElement("li");
  li.classList.add("restaurant");

  const mappedImage = IMAGE_SRC_BY_RESTAURANTS_CATEGORY[category];

  li.innerHTML = `<div class="restaurant__category">
<img src="${mappedImage}" alt="${category}" class="category-icon" />
</div>
<div class="restaurant__info">
<div class="restaurant__header">
    <div class="restaurant__title">  
    <h3 class="restaurant__name text-subtitle">${name}</h3>
<span class="restaurant__distance text-body">캠퍼스로부터 ${distance}분 내</span>
</div>
<img src="images/favorite-icon-lined.png" alt="즐겨찾기" class="favorite-icon" />
</div>
${
  description
    ? `<p class="restaurant__description text-body">${description}</p>`
    : ""
}
</div>
  `;

  return li;
};

export default createRestaurantItem;

import { IMAGE_SRC_BY_RESTAURANTS_CATEGORY } from "../constants/constants.ts";
import { Restaurant } from "../types/restaurant.ts";

type RestaurantItemProps = {
  restaurantItem: Restaurant;
  onFavorite: (id: string) => void;
  onShowDetail: (id: string) => void;
};

const RestaurantItem = ({
  restaurantItem,
  onFavorite,
  onShowDetail,
}: RestaurantItemProps) => {
  const { id, category, name, distance, description, isFavorite } =
    restaurantItem;

  if (!id) {
    throw new Error("id가 없습니다.");
  }
  const li = document.createElement("li");
  li.classList.add("restaurant");
  li.id = id;

  const mappedImage = IMAGE_SRC_BY_RESTAURANTS_CATEGORY[category];

  const favoriteIconSrc = isFavorite
    ? "images/favorite-icon-filled.png"
    : "images/favorite-icon-lined.png";

  li.innerHTML = `<div class="restaurant__category">
<img src="${mappedImage}" alt="${category}" class="category-icon" />
</div>
<div class="restaurant__info">
<div class="restaurant__header">
    <div class="restaurant__title">  
    <h3 class="restaurant__name text-subtitle">${name}</h3>
<span class="restaurant__distance text-body">캠퍼스로부터 ${distance}분 내</span>
</div>
<img src="${favoriteIconSrc}" alt="즐겨찾기" class="favorite-icon" data-id="${id}" data-favorite="${isFavorite}" />
</div>
${
  description
    ? `<p class="restaurant__description text-body">${description}</p>`
    : ""
}
</div>
  `;

  li.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("favorite-icon")) {
      onFavorite(id);
      return;
    }

    onShowDetail(id);
  });

  return li;
};

export default RestaurantItem;

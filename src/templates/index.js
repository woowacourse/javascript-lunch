import { CATEGORY_IMAGE } from "../constant/imageConstant";

export const renderRestaurant = (info) => {
  return `<li class="restaurant">
    <div class="restaurant__category">
    <img
        src="./category-${CATEGORY_IMAGE[info.category]}.png"
        alt="${info.category}"
        class="category-icon"
        />
        </div>
        <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${info.name}</h3>
        <span class="restaurant__distance text-body"
        >캠퍼스부터 ${info.distance}분 내</span
        >
        <p class="restaurant__description text-body">
        ${info.description}
        </p>
        </div>
        </li>`;
};

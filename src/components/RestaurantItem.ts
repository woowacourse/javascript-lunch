import RestaurantType from "../type/Restaurant";
import {
  categoryAsian,
  categoryChinese,
  categoryJapanese,
  categoryKorean,
  categoryWestern,
  categoryEtc,
} from "../assets/";

const findImage = (category: string) => {
  const imageSrc: { [key: string]: string } = {
    한식: categoryKorean,
    중식: categoryChinese,
    일식: categoryJapanese,
    양식: categoryWestern,
    아시안: categoryAsian,
    기타: categoryEtc,
  };
  return imageSrc[category];
};

const RestaurantItem = (restaurant: RestaurantType) => {
  return `
      <li class="restaurant">
        <div class="restaurant__category">
          <img
            src="${findImage(restaurant.category)}" 
            alt="${restaurant.category}" 
            class="category-icon"
          >
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">
            ${restaurant.name}
          </h3>
          <span class="restaurant__distance text-body" >
            캠퍼스부터 ${restaurant.distance}분 내
          </span>
          <p class="restaurant__description text-body">
            ${restaurant.description}
          </p>
        </div>
      </li>
    `;
};

export default RestaurantItem;

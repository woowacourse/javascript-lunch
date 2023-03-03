import RestaurantType from "../type/Restaurant";
import {
  categoryAsian,
  categoryChinese,
  categoryJapanese,
  categoryKorean,
  categoryWestern,
  categoryEtc,
} from "../assets/";

class RestaurantItem {
  render(restaurant: RestaurantType) {
    return `
      <li class="restaurant">
        <div class="restaurant__category">
          <img src="${this.findImage(restaurant.category)}" alt="${
      restaurant.category
    }" class="category-icon">
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${
            restaurant.distance
          }분 내</span>
          <p class="restaurant__description text-body">${
            restaurant.description
          }</p>
        </div>
      </li>
    `;
  }

  findImage(category: string) {
    const imageSrc: any = {
      한식: categoryKorean as string,
      중식: categoryChinese as string,
      일식: categoryJapanese as string,
      양식: categoryWestern as string,
      아시안: categoryAsian as string,
      기타: categoryEtc as string,
    };
    return imageSrc[category];
  }
}

export default RestaurantItem;

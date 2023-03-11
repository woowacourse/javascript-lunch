import categoryKoreanImg from '../../templates/category-korean.png';
import categoryAsianImg from '../../templates/category-asian.png';
import categoryChineseImg from '../../templates/category-chinese.png';
import categoryEtcImg from '../../templates/category-etc.png';
import categoryJapaneseImg from '../../templates/category-japanese.png';
import categoryWesternImg from '../../templates/category-western.png';

const category = {
  한식: categoryKoreanImg,
  중식: categoryChineseImg,
  일식: categoryJapaneseImg,
  양식: categoryWesternImg,
  아시안: categoryAsianImg,
  기타: categoryEtcImg,
};

export interface RestaurantType {
  category: '한식' | '중식' | '일식' | '양식' | '아시안' | '기타';
  name: string;
  distance: 5 | 10 | 15 | 20 | 30;
  description?: string;
  link?: string;
}

export class Restaurant {
  #restaurant;

  constructor(restaurant: RestaurantType) {
    this.#restaurant = restaurant;
  }

  template() {
    return `<li class="restaurant">
    <div class="restaurant__category">
      <img src="${category[this.#restaurant.category]}" alt="${
      this.#restaurant.category
    }" class="category-icon">
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${this.#restaurant.name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${
        this.#restaurant.distance
      }분 내</span>
      <p class="restaurant__description text-body">${
        this.#restaurant?.description
      }</p>
    </div>
  </li>`;
  }

  setEvent() {
    const restaurant = document.querySelector('.restaurant');
    restaurant?.addEventListener('click', () => {
      if (this.#restaurant.link) {
        location.href = this.#restaurant.link;
      }
    });
  }
  getRestaurant() {
    return this.#restaurant;
  }
}

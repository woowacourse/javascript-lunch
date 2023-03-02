import { Component, Restaurant } from '../type';
import categoryKorean from '../asset/icons/category-korean.png';
import categoryChinese from '../asset/icons/category-chinese.png';
import categoryJapanese from '../asset/icons/category-japanese.png';
import categoryWestern from '../asset/icons/category-western.png';
import categoryAsian from '../asset/icons/category-asian.png';
import categoryEtc from '../asset/icons/category-etc.png';

type RestaurantListItemState = {
  restaurant: Restaurant;
};

type RestaurantListItemProps = {
  $parent: DocumentFragment;
  restaurant: Restaurant;
};

class RestaurantListItem implements Component<RestaurantListItemState> {
  $component: HTMLElement;
  state: RestaurantListItemState;

  constructor({ $parent, restaurant }: RestaurantListItemProps) {
    this.$component = document.createElement('li');
    this.$component.classList.add('restaurant');
    this.state = {
      restaurant,
    };
    $parent.append(this.$component);
  }

  setState = (newState: RestaurantListItemState) => {
    this.state = newState;
    this.render();
  };

  render = () => {
    const imageMap: {
      [key: string]: string;
    } = {
      한식: categoryKorean,
      중식: categoryChinese,
      일식: categoryJapanese,
      양식: categoryWestern,
      아시안: categoryAsian,
      기타: categoryEtc,
    };

    const { category, name, distance, description } = this.state.restaurant;
    this.$component.innerHTML = `
      <div class="restaurant__category">
        <img src="${imageMap[category]}"" alt="${category}" class="category-icon" />
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="restaurant__description text-body">${description}</p>
      </div>
    `;
  };
}

export default RestaurantListItem;

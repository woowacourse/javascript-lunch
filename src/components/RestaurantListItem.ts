import type { Component } from '../interface';
import type { Restaurant } from '../type';
import { CATEGORY_IMAGE_URL } from '../utils/constants';

type RestaurantListItemState = {
  restaurant: Restaurant;
};

type RestaurantListItemProps = {
  $parent: DocumentFragment;
  restaurant: Restaurant;
};

class RestaurantListItem implements Component<RestaurantListItemState> {
  $parent: HTMLElement;
  state: RestaurantListItemState;

  constructor({ $parent, restaurant }: RestaurantListItemProps) {
    this.$parent = document.createElement('li');
    this.$parent.classList.add('restaurant');

    this.state = { restaurant };

    $parent.append(this.$parent);
  }

  setState(newState: RestaurantListItemState) {
    this.state = newState;
    this.render();
  }

  render() {
    const { category, name, distance, description } = this.state.restaurant;

    this.$parent.innerHTML = `
      <div class="restaurant__category">
        <img src="${CATEGORY_IMAGE_URL[category]}"" alt="${category}" class="category-icon" />
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="restaurant__description text-body">${description}</p>
      </div>
    `;
  }
}

export default RestaurantListItem;

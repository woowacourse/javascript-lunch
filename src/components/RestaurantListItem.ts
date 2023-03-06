import type { Component, Restaurant } from '../type';
import { CATEGORY_IMAGE_URL } from '../utils/constants';

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

    this.state = { restaurant };

    $parent.append(this.$component);
  }

  setState = (newState: RestaurantListItemState) => {
    this.state = newState;
    this.render();
  };

  render = () => {
    const { category, name, distance, description } = this.state.restaurant;

    this.$component.innerHTML = `
      <div class="restaurant__category">
        <img src="${CATEGORY_IMAGE_URL[category]}"" alt="${category}" class="category-icon" />
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

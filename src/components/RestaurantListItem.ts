import { Component, Restaurant } from '../type';

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
      한식: 'category-korean',
      중식: 'category-chinese',
      일식: 'category-japanese',
      양식: 'category-western',
      아시안: 'category-asian',
      기타: 'category-etc',
    };
    const { category, name, distance, description } = this.state.restaurant;
    this.$component.innerHTML = `
      <div class="restaurant__category">
        <img src="../../image/${imageMap[category]}.png" alt="중식" class="category-icon" />
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

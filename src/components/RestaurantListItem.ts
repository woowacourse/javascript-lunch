import type { Component } from '../interface';
import type { Restaurant } from '../type';
import { fetchFavoriteId } from '../utils/api';
import { CATEGORY_IMAGE_URL } from '../utils/constants';

type RestaurantListItemState = {
  restaurant: Restaurant;
};

type RestaurantListItemProps = {
  $parent: DocumentFragment;
  restaurant: Restaurant;
};

class RestaurantListItem implements Component<RestaurantListItemState> {
  $target: HTMLElement;
  state: RestaurantListItemState;

  constructor({ $parent, restaurant }: RestaurantListItemProps) {
    this.$target = document.createElement('li');
    this.$target.classList.add('restaurant');

    this.state = { restaurant };

    $parent.append(this.$target);
  }

  setState(newState: RestaurantListItemState) {
    this.state = newState;
    this.render();
  }

  // TODO: 이미지 소스 상수화!
  render() {
    const { id, category, name, distance, description, isFavorite } = this.state.restaurant;
    const FavoriteButtonImgSrc = isFavorite
      ? './favorite-icon-filled.png'
      : './favorite-icon-lined.png';
    this.$target.innerHTML = `
      <div class="restaurant__category">
        <img src="${CATEGORY_IMAGE_URL[category]}"" alt="${category}" class="category-icon" />
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="restaurant__description text-body">${description}</p>
      </div>
      <div class='restaurant-option'>
        <button class="favorite__button" data-favorite-btn-id="${id}">
          <img src="${FavoriteButtonImgSrc}"/>
        </button>
      </div>
    `;

    this.$target.querySelector('.favorite__button')?.addEventListener('click', (e: Event) => {
      fetchFavoriteId(id);
      this.setState({
        restaurant: {
          ...this.state.restaurant,
          isFavorite: !this.state.restaurant.isFavorite,
        },
      });
    });
  }
}

export default RestaurantListItem;

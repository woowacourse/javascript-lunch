import type { Component } from '../interface';
import { Restaurant } from '../type';
import { deleteById, fetchFavoriteId, getRestaurantById } from '../utils/api';
import { CATEGORY_IMAGE_URL } from '../utils/constants';

type RestaurantInfoDrawerState = {
  restaurant: Restaurant;
  selectId: number;
  toggleOpenDrawer: () => void;
  handleByClickFavorite: () => void;
};

type RestaurantInfoDrawerProps = {
  $parent: HTMLElement;
  selectId: number;
  toggleOpenDrawer: () => void;
  handleByClickFavorite: () => void;
};

export default class RestaurantInfoDrawer implements Component<RestaurantInfoDrawerState> {
  $target: HTMLElement;
  state: RestaurantInfoDrawerState;
  constructor({
    $parent,
    selectId,
    toggleOpenDrawer,
    handleByClickFavorite,
  }: RestaurantInfoDrawerProps) {
    this.$target = document.createElement('div');
    this.$target.classList.add('modal');
    this.$target.classList.add('modal--open');
    const restaurant = getRestaurantById(selectId);
    this.state = { restaurant, toggleOpenDrawer, selectId, handleByClickFavorite };

    $parent.append(this.$target);
  }

  setState(newState: RestaurantInfoDrawerState) {
    this.state = newState;
    this.render();
  }

  addEvent() {
    this.$target.querySelector('#restaurant-delete__button')?.addEventListener('click', () => {
      console.log(this.state.restaurant.id);
      deleteById(this.state.restaurant.id);
      this.state.handleByClickFavorite();
      this.state.toggleOpenDrawer();
    });

    this.$target.querySelector('#drawer-close__button')?.addEventListener('click', (e: Event) => {
      e.stopPropagation();
      this.state.toggleOpenDrawer();
    });

    this.$target.querySelector('.favorite__button')?.addEventListener('click', (e: Event) => {
      e.stopPropagation();
      fetchFavoriteId(this.state.selectId);
      this.state.handleByClickFavorite();
      this.setState({
        ...this.state,
        restaurant: {
          ...this.state.restaurant,
          isFavorite: !this.state.restaurant.isFavorite,
        },
      });
    });
  }

  render() {
    const { category, name, distance, description, link, id, isFavorite } = this.state.restaurant;
    const FavoriteButtonImgSrc = isFavorite
      ? './favorite-icon-filled.png'
      : './favorite-icon-lined.png';
    this.$target.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-container restaurant-info-drawer">
          <div class="modal-header">
          <div class="restaurant__category">
            <img src="${CATEGORY_IMAGE_URL[category]}" alt="${category}" class="category-icon" />
          </div>
          <button class="favorite__button" data-favorite-btn-id="${id}">
            <img src="${FavoriteButtonImgSrc}"/>
          </button>
          </div>
        <div class="restaurant-info__drawer">
            <h1 class="restaurant__name text-subtitle">${name}</h1>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            <p class="text-body">${description}</p>
            <a href="${link}">${link}</a>
        </div>
        <div class="button-container">
            <button id="restaurant-delete__button" type="button" class="button button--secondary text-caption">삭제하기</button>
            <button id="drawer-close__button" class="button button--primary text-caption">닫기</button>
        </div>
        <div>
        `;
    this.addEvent();
  }
}

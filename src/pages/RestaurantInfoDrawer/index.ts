import type { Component } from '../../interface';
import { deleteById, fetchFavoriteId, getRestaurantById } from '../../utils/api';
import { CATEGORY_IMAGE_URL } from '../../utils/constants';
import { getImgSrcByFavorite } from '../../utils/util';

type RestaurantInfoDrawerState = {
  selectId: number;
  onToggleOpenDrawer: () => void;
  fetchNewRestaurants: () => void;
  onDeleteRestaurant: () => void;
};

type RestaurantInfoDrawerProps = {
  $parent: HTMLElement;
  selectId: number;
  onToggleOpenDrawer: () => void;
  fetchNewRestaurants: () => void;
  onDeleteRestaurant: () => void;
};

export default class RestaurantInfoDrawer implements Component<RestaurantInfoDrawerState> {
  $target: HTMLElement;
  state: RestaurantInfoDrawerState;
  constructor({
    $parent,
    selectId,
    onToggleOpenDrawer,
    fetchNewRestaurants,
    onDeleteRestaurant,
  }: RestaurantInfoDrawerProps) {
    this.$target = document.createElement('div');
    this.$target.classList.add('modal');
    this.$target.classList.add('modal--open');

    this.state = { onToggleOpenDrawer, selectId, fetchNewRestaurants, onDeleteRestaurant };

    $parent.append(this.$target);
  }

  private addEvent() {
    this.$target.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;

      switch (target.id) {
        case 'restaurant-delete__button':
          deleteById(this.state.selectId);
          this.state.onDeleteRestaurant();
          break;
        case 'drawer-close__button':
          e.stopPropagation();
          this.state.onToggleOpenDrawer();
          break;
        case 'favorite__button':
          e.stopPropagation();
          fetchFavoriteId(this.state.selectId);
          this.state.fetchNewRestaurants();
          this.render();
          break;
        default:
          return;
      }
    });
  }

  public render() {
    const { category, name, distance, description, link, id, isFavorite } = getRestaurantById(
      this.state.selectId
    );

    this.$target.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-container restaurant-info-drawer">
          <div class="modal-header">
          <div class="restaurant__category">
            <img src="${CATEGORY_IMAGE_URL[category]}" alt="${category}" class="category-icon" />
          </div>
          <button id="favorite__button" class="favorite__button" data-favorite-btn-id="${id}">
            <img class="favorite__button-img" src="${getImgSrcByFavorite(isFavorite)}"/>
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

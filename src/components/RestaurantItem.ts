import Component from '@res/core/Component';
import { FavoriteImage, ImageByCategory } from '@res/images/imageByCategory';
import { IRestaurant } from '@res/interfaces/IRestaurantInput';
import { $, on } from '@res/utils/domUtils';

export default class RestaurantItem extends Component {
  #props;

  constructor(target: HTMLElement, props: IRestaurant) {
    super(target);

    this.#props = props;
  }

  template(): string {
    const { id, category, name, distance, description, favorite }: IRestaurant = this.#props;

    return `
    <li data-id = ${id} class="restaurant">
      <div class="restaurant__category">
        ${this.categoryImageTemplate(category)}
      </div>
      <div class="restaurant__info">
        ${this.titleTemplate(name)}
        ${this.distanceTemplate(Number(distance))}
        ${this.descriptionTemplate(description)}
      </div>
      <div class="favorite"> 
        ${this.favoriteImageTemplate(favorite)}
      </div>
    </li>`;
  }

  setEvent() {
    const { id, category, name, distance, description, favorite }: IRestaurant = this.#props;

    on($(`li > [ data-id = ${id} ]`), 'click', () => {});

    return this;
  }

  favoriteImageTemplate(favorite: boolean) {
    const isFavorite = favorite ? 'favoriteOn' : 'favoriteOff';
    return `<img src=${FavoriteImage[isFavorite]} alt=${isFavorite} class="category-icon"/>`;
  }

  categoryImageTemplate(category: string): string {
    return `<img src=${ImageByCategory[category]} alt=${category} class="category-icon"/>`;
  }

  titleTemplate(name: string): string {
    return `<h3 class="restaurant__name text-subtitle">${name}</h3>`;
  }

  distanceTemplate(distance: number): string {
    if (distance === 0) return '';
    return `<span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 이내</span>`;
  }

  descriptionTemplate(description: string): string {
    return `<p class="restaurant__description text-body">${description}</p>`;
  }
}

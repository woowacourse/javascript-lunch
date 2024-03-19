import Component from './Component';
import favoriteLinedIcon from '../assets/favorite-icon-lined.png';
import favoriteFilledIcon from '../assets/favorite-icon-filled.png';
import displayCategoryIcon from '../utils/displayCategoryIcon';

class RestaurantItem extends Component {
  static observedAttributes: string[] = ['category', 'name', 'distance', 'description', 'reference', 'favorite'];

  #category: string | null;
  #name: string | null;
  #distance: string | null;
  #description: string | null;
  #favorite: boolean;

  constructor() {
    super();
    this.#category = this.getAttribute('category');
    this.#name = this.getAttribute('name');
    this.#distance = this.getAttribute('distance');
    this.#description = this.getAttribute('description');
    this.#favorite = this.#convertStringToBoolean(this.getAttribute('favorite'));
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (name === 'favorite') {
      this.#favorite = this.#convertStringToBoolean(newValue);
    } else {
      this.#category = this.getAttribute('category');
      this.#name = this.getAttribute('name');
      this.#distance = this.getAttribute('distance');
      this.#description = this.getAttribute('description');
    }
    this.render();
  }

  #convertStringToBoolean(value: string | null): boolean {
    return value === 'true';
  }

  template(): string {
    return `
      <li class="restaurant-list" name="${this.#name}">
        <div class="restaurant-item-img-wrapper">
        ${displayCategoryIcon(this.#category)}
        </div>
        <div class="restaurant-item-content-wrapper">
          <div class="restaurant-item-subtitle-distance-favorite-wrapper">
            <div class="restaurant-item-subtitle-distance-wrapper">
              <h2 class="restaurant__name text-subtitle">${this.#name}</h2>
              <p class="restaurant__distance text-body">캠퍼스부터 ${this.#distance}분 내</p>
            </div>
            <div class="restaurant-item-favorite-icon-wrapper">
              <img src=${
                this.#favorite ? favoriteFilledIcon : favoriteLinedIcon
              } alt="즐겨찾기" class="favorite-icon" />
            </div>
          </div>
          <div class="restaurant-item-discrption-wrapper">
            <p class="restaurant__description text-body">
              ${this.#description !== undefined ? this.#description : ''}
            </p>
          </div>
        </div>
      </li>
      `;
  }
}

export default RestaurantItem;

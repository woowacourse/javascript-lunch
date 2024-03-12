import Component from './Component';

class RestaurantItem extends Component {
  #category: TCategory;
  #name: string;
  #distance: TDistance;
  #description: string;

  constructor() {
    super();

    this.#category = (this.getAttribute('category') as TCategory) || '';
    this.#name = this.getAttribute('name') || '';
    this.#distance = (Number(this.getAttribute('distance')) as TDistance) || '';
    this.#description = this.getAttribute('description') || '';
  }

  template() {
    return `
      <li class="restaurant">
        <category-icon category=${this.#category}></category-icon>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${this.#name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${this.#distance}분 내</span>
          <p class="restaurant__description text-body">
            ${this.#description || ''}
          </p>
      </div>
      </li>
    `;
  }
}

export default RestaurantItem;

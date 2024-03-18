import Component from './core/Component';
import RestaurantRepository from '../domain/RestaurantRepository';

class RestaurantList extends Component {
  static observedAttributes: string[] = ['category', 'sorting', 'type'];

  #restaurants: IRestaurant[];

  constructor() {
    super();
    this.#restaurants = this.#generateRestaurants();
  }

  attributeChangedCallback(): void {
    this.#restaurants = this.#generateRestaurants();
    this.render();
  }

  #generateRestaurants(): IRestaurant[] {
    const category = this.getAttribute('category') ?? '전체';
    const sorting = this.getAttribute('sorting') ?? '이름순';
    const type = this.getAttribute('type') ?? '모든 음식점';

    return RestaurantRepository.transformRestaurants(
      category as TAllCategory,
      sorting as TSortingOption,
      type as TTabOption,
    );
  }

  #generateRestaurantListContent(): string {
    return this.#restaurants.length > 0
      ? this.#restaurants
          .map((restaurant: IRestaurant) => `<restaurant-item key=${restaurant.key}></restaurant-item>`)
          .join('')
      : `<p class="text-caption restaurant-list__default">음식점이 없습니다.<br/>음식점을 추가해 주세요.</p>`;
  }

  template(): string {
    return `
      <ul class="restaurant-list-container">
        ${this.#generateRestaurantListContent()}
      </ul>
    `;
  }
}

export default RestaurantList;

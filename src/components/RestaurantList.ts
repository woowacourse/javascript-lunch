import RestaurantRepository from '../domain/RestaurantRepository';
import { $addEvent } from '../utils/dom';
import Component from './Component';

class RestaurantList extends Component {
  static observedAttributes: string[] = ['category', 'sorting'];

  #restaurants: IRestaurant[] = [];

  constructor() {
    super();
    this.setAttribute('category', '전체');
    this.setAttribute('sorting', '이름순');
    this.#generateRestaurants();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'category' || name === 'sorting') {
      this.#generateRestaurants();
    }
  }

  setEvent(): void {
    document.addEventListener('submitButtonClick', this.#handleSubmitButtonClick.bind(this) as EventListener);
  }

  removeEvent(): void {
    document.removeEventListener('submitButtonClick', this.#handleSubmitButtonClick.bind(this) as EventListener);
  }

  #handleSubmitButtonClick(event: CustomEvent<IRestaurant>) {
    event.preventDefault();
    this.#updateRestaurants(event.detail);
  }

  #generateRestaurants() {
    const category = this.getAttribute('category') as TAllCategory;
    const sorting = this.getAttribute('sorting') as TSortingOption;
    this.#restaurants = RestaurantRepository.transformRestaurants(category, sorting);
    this.render();
  }

  #updateRestaurants(restaurant: IRestaurant) {
    RestaurantRepository.addRestaurant(restaurant);
    this.#generateRestaurants();
  }

  template() {
    if (!this.#restaurants) {
      return '';
    }
    return `
    <section class="restaurant-list-container">
      <ol>
        ${this.#restaurants
          .map(
            (restaurant) =>
              `<restaurant-item category="${restaurant.category}" name="${restaurant.name}" distance="${restaurant.distance}" description="${restaurant.description}" reference="${restaurant.reference}"></restaurant-item>`,
          )
          .join('')}
      </ol>
    </section>
    `;
  }
}

export default RestaurantList;

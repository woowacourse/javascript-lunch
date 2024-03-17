import RestaurantRepository from '../domain/RestaurantRepository';
import Component from './Component';

class RestaurantList extends Component {
  static observedAttributes: string[] = ['theme', 'category', 'sorting'];

  #restaurants: IRestaurant[] = [];

  constructor() {
    super();
    this.setAttribute('theme', '모든 음식점');
    this.setAttribute('category', '전체');
    this.setAttribute('sorting', '이름순');
    this.#generateThemeResult();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'theme' || name === 'category' || name === 'sorting') {
      this.#generateThemeResult();
    }
  }

  setEvent(): void {
    document.addEventListener('submitButtonClick', this.#handleSubmitButtonClick.bind(this) as EventListener);
    document.querySelector('.restaurant-list-wrapper')?.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const restaurantName = target.closest('.restaurant-list')?.getAttribute('name');
      if (restaurantName) {
        this.#updateFavoriteStateAndRegenerateList(restaurantName);
      }
    });
  }

  removeEvent(): void {
    document.removeEventListener('submitButtonClick', this.#handleSubmitButtonClick.bind(this) as EventListener);
  }

  render(): void {
    this.innerHTML = this.template();
    this.setEvent();
  }

  #handleSubmitButtonClick(event: CustomEvent<IRestaurant>) {
    event.preventDefault();
    this.#addRestaurantAndRegenerateResults(event.detail);
  }

  #generateThemeResult() {
    const theme = this.getAttribute('theme') as TTheme;
    const filteredByThemeRestaurants = RestaurantRepository.transformByTheme(theme) as IRestaurant[];
    this.#generateSelectResult(filteredByThemeRestaurants);
  }

  #generateSelectResult(filteredByThemeRestaurants: IRestaurant[]) {
    const category = this.getAttribute('category') as TAllCategory;
    const sorting = this.getAttribute('sorting') as TSortingOption;
    this.#restaurants = RestaurantRepository.transformBySelector(filteredByThemeRestaurants, category, sorting);
    this.render();
  }

  #updateFavoriteStateAndRegenerateList(restaurantName: string) {
    this.#restaurants = RestaurantRepository.changeFavoriteState(restaurantName);
    this.#generateThemeResult();
  }

  #addRestaurantAndRegenerateResults(restaurant: IRestaurant) {
    RestaurantRepository.addRestaurant(restaurant);
    this.#generateThemeResult();
  }

  template() {
    if (!this.#restaurants) {
      return '';
    }
    return `
    <section class="restaurant-list-container">
      <ol class="restaurant-list-wrapper">
        ${this.#restaurants
          .map(
            (restaurant) =>
              `<restaurant-item category="${restaurant.category}" name="${restaurant.name}" distance="${restaurant.distance}" description="${restaurant.description}" reference="${restaurant.reference}" favorite="${restaurant.favorite}"></restaurant-item>`,
          )
          .join('')}
      </ol>
    </section>
    `;
  }
}

export default RestaurantList;

import RestaurantRepository from '../domain/RestaurantRepository';
import { $setAttribute } from '../utils/dom';
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
    if (oldValue !== newValue && (name === 'theme' || name === 'category' || name === 'sorting')) {
      this.#generateThemeResult();
    }
  }

  #handleListWrapper(event: Event) {
    const target = event.target as HTMLElement;
    const restaurantName = target.closest('.restaurant-list')?.getAttribute('name');
    if (target.className === 'favorite-icon' && restaurantName) {
      this.#updateFavoriteStateAndRegenerateList(restaurantName);
    }

    const validTargetElement = {
      name: 'restaurant__name',
      distance: 'restaurant__distance',
      description: 'restaurant__description',
      reference: 'restaurant__reference',
    };
    if (Object.values(validTargetElement).some((className) => target.className.includes(className))) {
      const restaurantName =
        target.closest('.restaurant-item-content-wrapper')?.querySelector('.restaurant__name')?.innerHTML ||
        target.innerHTML;
      if (restaurantName) this.dispatchEvent(new CustomEvent('detailClick', { bubbles: true, detail: restaurantName }));
    }
  }

  setEvent(): void {
    document.addEventListener('submitButtonClick', this.#handleSubmitButtonClick.bind(this) as EventListener);
    document.querySelector('.restaurant-list-wrapper')?.addEventListener('click', this.#handleListWrapper);
    document.addEventListener(
      'detailFavoriteButtonClick',
      this.#handleDetailFavoriteButtonClick.bind(this) as EventListener,
    );
    document.querySelector('.restaurant-list-wrapper')?.addEventListener('click', this.#handleListWrapper.bind(this));
    document.addEventListener('deleteButtonClick', this.#handleDelete.bind(this) as EventListener);
  }

  removeEvent(): void {
    document.removeEventListener('submitButtonClick', this.#handleSubmitButtonClick.bind(this) as EventListener);
  }

  render(): void {
    this.innerHTML = this.template();
    this.setEvent();
  }

  #handleDetailFavoriteButtonClick(event: CustomEvent<string>) {
    this.#updateFavoriteStateAndRegenerateList(event.detail);
    this.makeCustomEvent('detailClick');
  }

  #handleDelete(event: CustomEvent<string>) {
    RestaurantRepository.deleteRestaurant(event.detail);
    $setAttribute('lunch-picker-modal', 'open', 'false');
    this.#generateThemeResult();
  }

  #handleItemClick(restaurantName: string) {
    this.dispatchEvent(new CustomEvent('detailClick', { bubbles: true, detail: restaurantName }));
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

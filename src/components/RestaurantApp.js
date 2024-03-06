import Restaurants from '../domain/Restaurants';

class RestaurantApp extends HTMLElement {
  #restaurants;

  constructor() {
    super();
    this.#restaurants = Restaurants.transformRestaurants('전체', '이름순');
  }

  connectedCallback() {
    if (this.isConnected) {
      this.render();
      this.setEvent();
    }
  }

  disconnectedCallback() {
    this.removeEvent();
  }

  render() {
    this.innerHTML = this.template();
  }

  setEvent() {
    this.addEventListener('change', (event) => {
      if (event.target.classList.contains('restaurant-filter')) {
        this.generateRestaurantsBySelection();
      }
    });
  }

  removeEvent() {}

  generateRestaurantsBySelection() {
    const category = this.querySelector('.category > .restaurant-filter').value;
    const sorting = this.querySelector('.sorting > .restaurant-filter').value;

    this.#restaurants = Restaurants.transformRestaurants(category, sorting);

    this.querySelector('restaurant-list').setAttribute('restaurants', `${JSON.stringify(this.#restaurants)}`);
  }

  template() {
    return `
      <custom-header></custom-header>
      <filter-box-container></filter-box-container>
      <restaurant-list restaurants="${JSON.stringify(this.#restaurants).replace(/"/g, '&quot;')}"></restaurant-list>
    `;
  }
}

export default RestaurantApp;

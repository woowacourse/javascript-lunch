import restaurantCatalog from '../../domain/RestaurantCatalog';

class Dropdown extends HTMLSelectElement {
  connectedCallback() {
    this.addEventListener('change', (event) => {
      const restaurantList = document.querySelector('.restaurant-list');

      this.#setAttributeCategorySelect(restaurantList, event.target.value);
      this.#setAttributeSortSelect(restaurantList, event.target.value);
    });
  }

  #setAttributeCategorySelect(restaurantList, eventValue) {
    const restaurants = restaurantCatalog.filterByCategory(eventValue);
    if (this.id === 'category-select') {
      restaurantList.setAttribute(
        'data-restaurants',
        JSON.stringify(restaurants.map((restaurant) => restaurant.getRestaurantInfoObject())),
      );
    }
  }

  #setAttributeSortSelect(restaurantList, eventValue) {
    if (this.id === 'sort-select') {
      restaurantList.setAttribute('data-sort', eventValue);
    }
  }

  addOptions(options) {
    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      this.appendChild(optionElement);
    });
  }
}

export default Dropdown;

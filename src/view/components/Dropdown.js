class Dropdown extends HTMLSelectElement {
  #catalog;

  connectedCallback() {
    this.addEventListener('change', (e) => {
      const restaurants = this.#catalog.filterByCategory(e.target.value);

      const restaurantList = document.querySelector('.restaurant-list');

      if (this.id === 'category-select') {
        restaurantList.setAttribute(
          'data-restaurants',
          JSON.stringify(restaurants.map((restaurant) => restaurant.getInfo())),
        );
      }
      if (this.id === 'sort-select') {
        restaurantList.setAttribute('data-sort', e.target.value);
      }
    });
  }

  addOptions(options) {
    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      this.appendChild(optionElement);
    });
  }

  set catalog(catalog) {
    this.#catalog = catalog;
  }
}

export default Dropdown;

export default class Tab {
  constructor($root) {
    this.$root = $root;

    this.$filters = document.querySelector('.restaurant-filter-container');
    this.$restaurantList = document.querySelector('.restaurant-list-container');
    this.$favoriteList = document.querySelector('.restaurant-favorite-container');
  }

  render() {
    this.$root.insertAdjacentHTML('beforeend', this.template());
  }

  template() {
    return `
      <ul id="tabs">
        <li id="restaurant-list" class="tab__item text-subtitle active">모든 음식점</li>
        <li id="restaurant-favorite" class="tab__item text-subtitle">자주 가는 음식점</li>
      </ul>
    `;
  }

  bindEvents() {
    this.$root.querySelector('#tabs').addEventListener('click', (event) => {
      const target = event.target;

      if (target.id === 'restaurant-list') {
        this.$filters.classList.remove('hide');
        this.$restaurantList.classList.remove('hide');
        this.$favoriteList.classList.add('hide');

        this.restaurantList.rerender();
      }
      if (target.id === 'restaurant-favorite') {
        this.$filters.classList.add('hide');
        this.$restaurantList.classList.add('hide');
        this.$favoriteList.classList.remove('hide');

        this.favoriteList.rerender();
      }

      this.$root.querySelectorAll('.tab__item').forEach((tabItem) => {
        tabItem.classList.remove('active');
      });

      target.classList.add('active');
    });
  }

  inject(restaurantList, favoriteList) {
    this.restaurantList = restaurantList;
    this.favoriteList = favoriteList;

    return this;
  }

  mount() {
    this.render();
    this.bindEvents();
  }
}

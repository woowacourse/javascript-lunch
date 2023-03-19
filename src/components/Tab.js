export default class Tab {
  constructor($root) {
    this.$root = $root;
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
      const hideTabs = this.tabs.filter((tab) => target.id !== tab.tabName);
      const showTabs = this.tabs.filter((tab) => target.id === tab.tabName);

      console.log(hideTabs);
      console.log(showTabs);

      hideTabs.forEach((tab) => tab.$root.classList.add('hide'));
      showTabs.forEach((tab) => {
        tab.$root.classList.remove('hide');
        tab.rerender();
      });

      this.$root.querySelectorAll('.tab__item').forEach((tabItem) => {
        tabItem.classList.remove('active');
      });

      target.classList.add('active');
    });
  }

  inject(restaurantList, favoriteList, filters) {
    this.tabs = [restaurantList, favoriteList, filters];

    return this;
  }

  mount() {
    this.render();
    this.bindEvents();
  }
}

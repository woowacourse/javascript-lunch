import Component from './Component';

class LunchPickerApp extends Component {
  setEvent() {
    this.$addEvent('.restaurant-filter-container', 'updateRestaurantList', this.#updateRestaurantList);
    this.$addEvent('restaurant-add-modal', 'updateRestaurantList', this.#updateRestaurantList);
  }

  removeEvent() {
    this.$removeEvent('.restaurant-filter-container', 'updateRestaurantList', this.#updateRestaurantList);
    this.$removeEvent('restaurant-add-modal', 'updateRestaurantList', this.#updateRestaurantList);
  }

  #updateRestaurantList = () => {
    const category = (this.$('.category') as HTMLSelectElement).value || '전체';
    const sorting = (this.$('.sorting') as HTMLSelectElement).value || '이름순';

    this.$setAttribute('restaurant-list', 'category', `${category}`);
    this.$setAttribute('restaurant-list', 'sorting', `${sorting}`);
  };

  template() {
    return `
      <lunch-picker-header></lunch-picker-header>
      <section class="restaurant-filter-container">
          <filter-box type="category"></filter-box>
          <filter-box type="sorting"></filter-box>
      </section>
      <restaurant-list category="전체" sorting="이름순"></restaurant-list>
      <restaurant-add-modal open="false"></restaurant-add-modal>
    `;
  }
}

export default LunchPickerApp;

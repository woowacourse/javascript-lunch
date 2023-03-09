import restaurantManager from './domain/RestaurantManager';

export default class Component {
  $target;
  restaurantManager;

  constructor($target) {
    this.$target = $target;
    this.restaurantManager = restaurantManager;

    this.render();
  }

  addEvent(eventType, callback) {
    this.$target.addEventListener(eventType, callback);

    return this;
  }

  template(restaurantData) {
    return restaurantData;
  }

  render(restaurantData = '') {
    this.template(restaurantData) !== '' &&
      (this.$target.innerHTML = this.template(restaurantData));
  }
}

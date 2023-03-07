import restaurantManager from '../domain/RestaurantManager';

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

  template() {
    return '';
  }

  render() {
    this.template() && (this.$target.innerHTML = this.template());
  }
}

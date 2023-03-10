import restaurantManager from './domain/RestaurantManager';

export default class Component {
  $target;
  restaurantManager;
  props;

  constructor($target, props = {}) {
    this.$target = $target;
    this.restaurantManager = restaurantManager;
    this.props = props;

    this.render({ ...props });
  }

  addEvent(eventType, callback, target = this.$target) {
    target.addEventListener(eventType, callback);

    return this;
  }

  template(restaurantData) {
    return restaurantData;
  }

  render(restaurantData) {
    if (Object.keys(restaurantData).length === 0) this.$target.innerHTML = this.template();
    else this.$target.innerHTML = this.template(restaurantData);
  }
}

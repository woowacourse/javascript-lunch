import { RestaurantHeader, RestaurantList } from './components';
import { Component } from './components/core/index';

export default class Application extends Component {
  override onRender() {
    this.appendChild(new RestaurantHeader().element);
    this.appendChild(new RestaurantList().element);
  }
}

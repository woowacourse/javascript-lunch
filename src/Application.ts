import { RestaurantHeader, RestaurantList } from './components';
import Component from './core/Component';

export default class Application extends Component {
  override onRender() {
    this.appendChild(new RestaurantHeader().element);
    this.appendChild(new RestaurantList().element);
  }
}

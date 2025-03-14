import { RestaurantHeader, RestaurantList } from './components';
import Component from './core/Component';

export default class Application extends Component {
  override onRender() {
    this.appendChild(new RestaurantHeader().render());
    this.appendChild(new RestaurantList().render());
  }
}

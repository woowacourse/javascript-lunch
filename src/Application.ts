import { RestaurantHeader, RestaurantList } from './components';
import Component from './core/Component';

export default class Application extends Component {
  onRender() {
    this.appendChild(new RestaurantHeader({ title: '오늘 뭐 먹지', alt: '음식점 추가' }).render());
    this.appendChild(new RestaurantList().render());
  }
}

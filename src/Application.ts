import { Header, RestaurantList } from './components';
import Component from './core/Component';
import { html } from './lib/utils';

export default class Application extends Component {
  template() {
    return ``;
  }

  onRender() {
    this.appendChild(new Header({ title: '오늘 뭐 먹지' }).render());
    this.appendChild(new RestaurantList().render());
  }
}

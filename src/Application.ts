import { Header, RestaurantList } from './components';
import Component from './core/Component';
import { html } from './lib/utils';

export default class Application extends Component {
  template() {
    return html`${new Header({ title: '오늘 뭐 먹지' })}`;
  }

  onRender() {
    this.element.appendChild(new RestaurantList().render());
  }
}

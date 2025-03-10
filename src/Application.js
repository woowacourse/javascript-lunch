import { Header, RestaurantList } from './components/index.js';
import Component from './core/Component.js';

export default class Application extends Component {
  template() {
    return `
      ${new Header({ title: '오늘 뭐 먹지' }).template()}
    `;
  }

  onRender() {
    this.element.appendChild(new RestaurantList().render());
  }
}

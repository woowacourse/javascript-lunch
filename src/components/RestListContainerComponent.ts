import RestDataAPI from '../services/RestDataAPI';
import { Restaurant } from '../types/types';
import { $ } from '../utils/dom';
import Component from './Component';

class RestListContainerComponent extends Component {
  protected render() {
    this.classList.add('rest-list-container');

    return `
      <ul>
      </ul>
    `;
  }

  protected setEvents() {
    this.addEvent({ target: document, type: 'reloadList', handler: this.handleReloadList as EventListener });
  }

  private handleReloadList = (event: CustomEvent) => {
    const data = RestDataAPI.load(event.detail?.category, event.detail?.sortingKey);
    this.updateList(data);
  };

  private updateList = (data: Restaurant[]) => {
    const $ul = $('ul', this);
    $ul.innerHTML = data
      .map((restaurant) => {
        const attributes = Object.entries(restaurant)
          .map(([key, value]) => `data-${key}="${value}"`)
          .join(' ');
        return `<rest-card ${attributes}></rest-card>`;
      })
      .join('');
  };
}

customElements.define('rest-list-container', RestListContainerComponent);

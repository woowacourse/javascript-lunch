import { $, $$ } from '../utils/dom';
import Component from './Component';

class RestFilterContainerComponent extends Component {
  protected render() {
    this.classList.add('rest-filter-container');

    return `
    <rest-filter data-dataset="category"></rest-filter>
    <rest-filter data-dataset="sortingKey"></rest-filter>
    `;
  }

  protected setEvents() {
    this.addEvent({ target: this, type: 'change', handler: this.handleChangeFilter });
  }

  private handleChangeFilter() {
    const $filterList = $$('rest-filter');
    const filterStates: { [key: string]: string } = {};

    $filterList.forEach((_$filter) => {
      const $filter = _$filter as HTMLElement;
      const $select = $('select', $filter) as HTMLSelectElement;

      const key = $filter.dataset.dataset as string;
      const value = $select.value;

      filterStates[key] = value;
    });

    this.emitCustomEvent('reloadList', filterStates);
  }
}

customElements.define('rest-filter-container', RestFilterContainerComponent);

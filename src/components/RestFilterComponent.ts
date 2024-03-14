import { FILTER_DATASET } from '../constants/constants';
import { KeyOfFilterDataset } from '../types/types';
import Component from './Component';

class RestFilterContainerComponent extends Component {
  protected render({ dataset }: { dataset: KeyOfFilterDataset }): string {
    const options = Object.entries(FILTER_DATASET[dataset])
      .map(([key, value]) => `<option value="${key}">${value}</option>`)
      .join('');
    return `<select>${options}</select>`;
  }

  protected setEvents() {}
}

customElements.define('rest-filter', RestFilterContainerComponent);

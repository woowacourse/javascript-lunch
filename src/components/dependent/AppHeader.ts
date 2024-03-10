import '../../styles/appHeader.css';

import Component from '../Component';
import { EventInfo } from '../../types/component';

class AppHeaderComponent extends Component {
  protected setTemplate() {
    return `
      <template>
        <header-title />
        <modal-open-button />
      </template>`;
  }

  protected setEvents(): EventInfo[] {
    return [];
  }

  protected render() {
    this.appendChild(this.component);
  }
}

customElements.define('app-header', AppHeaderComponent);

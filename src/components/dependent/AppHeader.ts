import '../../styles/appHeader.css';

import Component from '../Component';
import { EventInfo } from '../../types/component';

class AppHeaderComponent extends Component {
  // NOTE: Custom Element는 Self Closing 형식을 사용할 수 없다.
  protected setTemplate() {
    return `
      <template>
        <div class="app-header">
          <header-title></header-title>
          <modal-open-button></modal-open-button>
        </div>
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

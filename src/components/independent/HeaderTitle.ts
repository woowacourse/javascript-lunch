import '../../styles/headerTitle.css';

import Component from '../Component';
import { EventInfo } from '../../types/component';

class HeaderTitleComponent extends Component {
  protected setTemplate() {
    return `
      <template>
        <h1 class = "head-title text-title">점심 뭐 먹지</h1>
      </template>`;
  }

  protected setEvents(): EventInfo[] {
    return [];
  }

  protected render() {
    this.appendChild(this.component);
  }
}

customElements.define('header-title', HeaderTitleComponent);

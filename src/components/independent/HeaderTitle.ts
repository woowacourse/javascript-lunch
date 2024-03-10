import Component from '../Component';
import { EventInfo } from '../../types/component';

class HeaderTitleComponent extends Component {
  protected setTemplateId() {
    return '#header-title-template';
  }

  protected setEvents(): EventInfo[] {
    return [];
  }

  protected render() {
    this.appendChild(this.component);
  }
}

customElements.define('header-title', HeaderTitleComponent);

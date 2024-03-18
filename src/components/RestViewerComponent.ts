import RestDataAPI from '../services/RestDataAPI';
import Component from './Component';

class RestViewerComponent extends Component {
  protected render() {
    return `
    <section>
      <rest-filter-container></rest-filter-container>
    </section>
    <section>
      <rest-list-container></rest-list-container>
    </section>
    `;
  }

  protected setEvents() {}
}

customElements.define('rest-viewer', RestViewerComponent);

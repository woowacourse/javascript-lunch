import './style.css';
import '../LunchItemFilter/LunchItemFilter';
import '../LunchItems/LunchItems';

const LUNCH_TAB_ALL = /* HTML */ `
  <lunch-item-filter></lunch-item-filter>
  <lunch-items></lunch-items>
`;

class LunchTabAll extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LUNCH_TAB_ALL;
  }
}

customElements.define('lunch-tab-all', LunchTabAll);

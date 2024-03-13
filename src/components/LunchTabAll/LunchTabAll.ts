import './style.css';
import '../LunchItemFilter/LunchItemFilter';
import '../LunchItems/LunchItems';

const LUNCH_TAB_ALL = (liked: boolean) => /* HTML */ `
  <div class="lunch-tab-all">
    <lunch-item-filter></lunch-item-filter>
    <lunch-items liked="${liked}"></lunch-items>
  </div>
`;

class LunchTabAll extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const liked: boolean = false;
    this.innerHTML = LUNCH_TAB_ALL(liked);
  }
}

customElements.define('lunch-tab-all', LunchTabAll);

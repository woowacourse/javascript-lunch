import './style.css';
import '../LunchTabButton/LunchTabButton';
import LunchTabLiked from '../LunchTabLiked/LunchTabLiked';
import LunchTabAll from '../LunchTabAll/LunchTabAll';

const LUNCH_TAB_TEMPLATE = /* HTML */ `
  <div class="lunch-tab">
    <lunch-tab-button class="tab-button-all" value="모든 음식점"></lunch-tab-button>
    <lunch-tab-button
      class="tab-button-liked tab--closed"
      value="자주 가는 음식점"
    ></lunch-tab-button>
  </div>
`;

class LunchTab extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEventListener();
  }

  render() {
    this.innerHTML = LUNCH_TAB_TEMPLATE;
  }

  setEventListener() {
    this.querySelector('.tab-button-liked')?.addEventListener('click', () => this.handleTabLiked());
    this.querySelector('.tab-button-all')?.addEventListener('click', () => this.handleTabAll());
  }

  handleButton(selectorList: string[]) {
    selectorList.forEach((selector: string) =>
      this.querySelector(selector)?.classList.toggle('tab--closed'),
    );
  }

  handleTabLiked() {
    this.handleButton(['.tab-button-all', '.tab-button-liked']);
    this.renderItems('lunch-tab-liked', LunchTabLiked);
    document.querySelector('lunch-tab-all')?.classList.toggle('lunch-tab-all--closed');
  }

  handleTabAll() {
    this.handleButton(['.tab-button-all', '.tab-button-liked']);
    this.renderItems('lunch-tab-all', LunchTabAll);
    document.querySelector('lunch-tab-liked')?.classList.toggle('lunch-tab-liked--closed');
  }

  renderItems(tagname: string, element: typeof LunchTabLiked | typeof LunchTabAll) {
    const htmlElement = document.querySelector(tagname);
    if (htmlElement instanceof element) {
      htmlElement.classList.remove(`${tagname}--closed`);
      htmlElement.render();
    }
  }
}

customElements.define('lunch-tab', LunchTab);

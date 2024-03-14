import { $$ } from '../../../util/domSelector';
import { Tab } from '../../../enum/enums';
import './RestaurantListTab.css';

class RestaurantListTab extends HTMLElement {
  currentTab: Tab;

  constructor() {
    super();
    this.currentTab = Tab['모든 음식점'];
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  private addEvent() {
    $$('.tab-button').forEach((button) => {
      button.addEventListener('click', this.handleClickTabButton.bind(this));
    });
  }

  private handleClickTabButton(event: Event) {
    if (event.target instanceof HTMLButtonElement && Object.keys(Tab).includes(event.target.value)) {
      this.currentTab = event.target.value as Tab;
      this.dispatchEvent(new CustomEvent('changeTab', { detail: this.currentTab }));
      this.updateActiveTab();
    }
  }

  private updateActiveTab() {
    $$('.tab-button').forEach((button) => {
      if (button instanceof HTMLButtonElement && button.value === this.currentTab) {
        button.classList.add('active');
        return;
      }
      button.classList.remove('active');
    });
  }

  private render() {
    this.innerHTML = ``;
    this.classList.add('restaurant-tab-container');
    const tabButtons = Object.values(Tab).map((tab) => new TabButton(this.currentTab === tab, tab));
    this.append(...tabButtons.map((button) => button.render()));
  }
}

export class TabButton {
  private isActive: boolean;
  private tab: Tab;

  constructor(isActive: boolean, tab: Tab) {
    this.isActive = isActive;
    this.tab = tab;
  }

  render() {
    const tabButton = document.createElement('button');
    tabButton.classList.add('tab-button');
    tabButton.type = 'button';
    tabButton.value = this.tab;
    tabButton.textContent = this.tab;
    if (this.isActive) {
      tabButton.classList.add('active');
    }
    return tabButton;
  }
}

customElements.define('restaurant-list-tab', RestaurantListTab);

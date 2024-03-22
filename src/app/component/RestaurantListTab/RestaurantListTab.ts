import { $$ } from '../../util/domSelector';
import { Tab } from '../../enum/enums';
import './RestaurantListTab.css';

class RestaurantListTab extends HTMLElement {
  currentTab: Tab;

  constructor() {
    super();
    this.currentTab = Tab.all;
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
    if (event.target instanceof HTMLButtonElement && Object.values(Tab).includes(event.target.value as Tab)) {
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

  private createTabButton(isActive: boolean, tabId: string, tabValue: Tab) {
    const tabButton = document.createElement('button');
    tabButton.classList.add('tab-button');
    tabButton.id = `tab-${tabId}-button`;
    tabButton.type = 'button';
    tabButton.value = tabValue;
    tabButton.textContent = tabValue;
    if (isActive) {
      tabButton.classList.add('active');
    }
    return tabButton;
  }

  private render() {
    this.classList.add('restaurant-tab-container');
    const tabButtons = Object.entries(Tab).map(([tabId, tabValue]) =>
      this.createTabButton(this.currentTab === tabValue, tabId, tabValue),
    );
    this.append(...tabButtons);
  }
}

if (!customElements.get('restaurant-list-tab')) {
  customElements.define('restaurant-list-tab', RestaurantListTab);
}

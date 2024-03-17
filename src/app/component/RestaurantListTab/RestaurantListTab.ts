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

  private render() {
    this.innerHTML = ``;
    this.classList.add('restaurant-tab-container');
    const tabButtons = Object.entries(Tab).map(
      ([tabId, tabValue]) => new TabButton(this.currentTab === tabValue, tabId, tabValue),
    );
    this.append(...tabButtons.map((button) => button.render()));
  }
}

export class TabButton {
  private isActive: boolean;
  private tabId: string;
  private tabValue: Tab;

  constructor(isActive: boolean, tabId: string, tabValue: Tab) {
    this.isActive = isActive;
    this.tabId = tabId;
    this.tabValue = tabValue;
  }

  render() {
    const tabButton = document.createElement('button');
    tabButton.classList.add('tab-button');
    tabButton.id = `tab-${this.tabId}-button`;
    tabButton.type = 'button';
    tabButton.value = this.tabValue;
    tabButton.textContent = this.tabValue;
    if (this.isActive) {
      tabButton.classList.add('active');
    }
    return tabButton;
  }
}

customElements.define('restaurant-list-tab', RestaurantListTab);

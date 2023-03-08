import './tabs.css';
import { TabType } from '../types/type';

export default class Tabs {
  $tab = document.createElement('div');

  currentTab: TabType;

  constructor($root: HTMLElement) {
    this.$tab.className = 'tab-container';
    this.currentTab = 'favorite';
    this.render();
    this.$tab.addEventListener('click', this.tabClickHandler);

    $root.insertAdjacentElement('afterbegin', this.$tab);
  }

  render() {
    this.$tab.innerHTML = `
      <button data-category="all">
        모든 음식점
      </button>
      <button data-category="favorite">
        자주가는 음식점
      </button>
    `;
  }

  tabClickHandler(event: Event) {
    const { dataset } = event.target as HTMLButtonElement;
    const { category } = dataset;

    switch (category) {
      case 'all':
        break;
      case 'favorite':
        break;
      default:
        return;
    }
  }
}

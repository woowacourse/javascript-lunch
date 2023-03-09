import './tabs.css';
import { TabType } from '../types/type';

export default class Tabs {
  $tab = document.createElement('div');

  currentTab: TabType;

  constructor(
    $root: HTMLElement,
    renderListArticle: (currentTab: TabType) => void
  ) {
    this.$tab.className = 'tab-container';
    this.currentTab = 'all';

    this.render();

    this.$tab.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLButtonElement)) return;
      const { dataset } = event.target;
      const { category } = dataset;

      const $buttons = this.$tab.querySelectorAll('button');
      $buttons.forEach(($button) => {
        $button.classList.remove('selected');

        if (category === $button.dataset.category)
          $button.classList.add('selected');
      });

      this.currentTab = category as TabType;

      renderListArticle(this.currentTab);
    });

    $root.insertAdjacentElement('afterbegin', this.$tab);
  }

  render() {
    this.$tab.innerHTML = '';
    this.$tab.insertAdjacentHTML('beforeend', this.template());
  }

  template() {
    return `
    <button class="tab-button text-body selected" data-category="all">
      모든 음식점
    </button>
    <button class="tab-button text-body" data-category="favorite">
      자주가는 음식점
    </button>
    
    `;
  }

  tabClickHandler(event: Event) {}
}

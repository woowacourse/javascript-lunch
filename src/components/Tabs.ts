import './tabs.css';
import { TabType } from '../types/type';
import { store } from '../store';

export default class Tabs {
  $tab = document.createElement('div');

  constructor(
    $root: HTMLElement,
    renderListArticle: (currentTab: TabType) => void
  ) {
    this.$tab.className = 'tab-container';

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

      store.currentTab = category as TabType;

      renderListArticle(store.currentTab);
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

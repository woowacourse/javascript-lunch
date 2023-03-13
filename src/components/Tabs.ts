import './tabs.css';
import { store } from '../store';

export default class Tabs {
  $tab: HTMLDivElement | null;

  constructor() {
    this.$tab = document.querySelector<HTMLDivElement>('.tab-container');
    if (this.$tab === null) return;

    this.addTabEventListener();
    this.render(this.$tab);
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

  render($targetElement: HTMLDivElement) {
    $targetElement.insertAdjacentHTML('beforeend', this.template());
  }

  addTabEventListener() {
    if (this.$tab === null) return;

    this.$tab.addEventListener('click', (event) => {
      const { target, currentTarget } = event;
      if (
        !(target instanceof HTMLButtonElement) ||
        !(currentTarget instanceof HTMLDivElement)
      )
        return;

      const { dataset } = target;
      const { category } = dataset;

      if (category !== 'all' && category !== 'favorite') return;

      const $buttons = currentTarget.querySelectorAll('button');
      $buttons.forEach(($button) => {
        $button.classList.remove('selected');

        if (category === $button.dataset.category)
          $button.classList.add('selected');
      });

      store.currentTab = category;

      store.renderListArticle();
    });
  }
}

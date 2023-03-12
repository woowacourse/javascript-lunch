import './tabs.css';
import { TabType } from '../types/type';
import { store } from '../store';

export default function Tabs(renderListArticle: (currentTab: TabType) => void) {
  const $tab = document.createElement('div');
  $tab.className = 'tab-container';

  const template = `
      <button class="tab-button text-body selected" data-category="all">
        모든 음식점
      </button>
      <button class="tab-button text-body" data-category="favorite">
        자주가는 음식점
      </button>
    `;

  $tab.insertAdjacentHTML('beforeend', template);

  $tab.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLButtonElement)) return;
    const { dataset } = event.target;
    const { category } = dataset;

    if (category !== 'all' && category !== 'favorite') return;

    const $buttons = $tab.querySelectorAll('button');
    $buttons.forEach(($button) => {
      $button.classList.remove('selected');

      if (category === $button.dataset.category)
        $button.classList.add('selected');
    });

    store.currentTab = category;

    renderListArticle(store.currentTab);
  });

  return $tab;
}

import { $, $$ } from '@/utils/DOM';
import BaseComponent from '../BaseComponent';
import RestaurantUpdateService from '@/domains/services/RestaurantUpdateService';
import { deleteParams, getUrlParams, setUrlParams } from '@/utils/url';
export type Tab = {
  id: string;
  title: string;
};

export const TabData: Tab[] = [
  {
    id: 'all',
    title: '모든 음식점',
  },
  {
    id: 'favorite',
    title: '자주 가는 음식점',
  },
];

class TabMenu extends BaseComponent {
  #tabData;
  #selectedTabId;
  #restaurantUpdateService;

  constructor() {
    super();
    this.#tabData = TabData;
    this.#selectedTabId = 'all';
    this.#restaurantUpdateService = new RestaurantUpdateService();
  }

  render() {
    deleteParams('tab');
    const $fragment = new DocumentFragment();
    this.#tabData.forEach((tab) => {
      const $tab = document.createElement('div');
      $tab.classList.add('tab', 'text-body');

      if (tab.id === this.#selectedTabId) $tab.classList.add('active');

      $tab.textContent = tab.title;
      $tab.id = `${tab.id}-tab`;
      $fragment.append($tab);
    });
    this.append($fragment);
  }

  updateSelectedTabStyles() {
    $$('.tab').forEach((tab) => {
      if (tab.id === this.#selectedTabId) return tab.classList.add('active');
      tab.classList.remove('active');
    });
  }

  setEvent() {
    this.#showAllTab();
    this.#showFavoriteTab();

    $$('.tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        this.#selectedTabId = tab.id;
        this.updateSelectedTabStyles();
      });
    });
  }

  #showFavoriteTab() {
    $<HTMLElement>('#favorite-tab').addEventListener('click', () => {
      setUrlParams('tab', 'favorite');
      this.#restaurantUpdateService.rerenderByFilter();
    });
  }

  #showAllTab() {
    $<HTMLElement>('#all-tab').addEventListener('click', () => {
      deleteParams('tab');
      this.#restaurantUpdateService.rerenderByFilter();
    });
  }
}

export default TabMenu;

customElements.define('tab-menu', TabMenu);

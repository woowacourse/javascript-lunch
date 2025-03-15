// TabController.ts
import RestaurantTabContainer from '../components/tab/RestaurantTabContainer';
import { TabType } from '../types/types';
import { $, $all } from '../util/selector';

export default class TabController {
  #container: HTMLElement | null;
  #currentTab: TabType;
  #onTabChange: (tabType: TabType) => void;

  constructor(onTabChange: (tabType: TabType) => void) {
    this.#container = null;
    this.#currentTab = 'all';
    this.#onTabChange = onTabChange;
  }

  render() {
    const main = $('main');
    const tabContainer = RestaurantTabContainer(this.#currentTab);
    main?.prepend(tabContainer);

    this.#container = tabContainer;

    this.#bindEvents();
  }

  #bindEvents() {
    if (!this.#container) return;

    const tabs = $all('.restaurant-tab', this.#container);

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const tabType = ((tab as HTMLElement).dataset.tab || 'all') as TabType;

        if (this.#currentTab === tabType) {
          return;
        }

        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        this.#container?.setAttribute('data-active', tabType);
        this.#currentTab = tabType;

        this.#onTabChange(tabType);
      });
    });
  }
}

import Component from '../../Component';
import { define } from '../../decorators';
import style from './index.css';

export type TabItem = {
  label: string;
  value: string;
};

@define('r-tabs')
class Tabs extends Component {
  #tabItems: TabItem[] = [];

  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

  setTabItems(tabItems: [TabItem, ...TabItem[]]) {
    this.#tabItems = tabItems;
    this.render();
    this.setSelectedTabItem(tabItems[0]);
  }

  setSelectedTabItem(tabItem: TabItem) {
    this.shadowRoot?.querySelector('button[active]')?.removeAttribute('active');
    this.shadowRoot
      ?.querySelector(`button[data-value="${tabItem.value}"]`)
      ?.setAttribute('active', '');

    this.shadowRoot?.querySelector('slot[active]')?.removeAttribute('active');
    this.shadowRoot?.querySelector(`slot[name="${tabItem.value}"]`)?.setAttribute('active', '');
  }

  private onClickTabItem(event: Event) {
    const $button = event.target;
    if (!($button instanceof HTMLButtonElement)) return;

    const tabItem = this.#tabItems.find((_tabItem) => _tabItem.value === $button.dataset.value);
    if (!tabItem) return;

    this.setSelectedTabItem(tabItem);
  }

  override getRenderTemplate() {
    return `
      <ul>
        ${this.#tabItems
          .map(
            (tabItem) =>
              `<li>
                <button
                  class="text-body"
                  data-value="${tabItem.value}"
                >${tabItem.label}</button>
              </li>`,
          )
          .join('')}
      </ul>

      <div>
        ${this.#tabItems.map((tabItem) => `<slot name="${tabItem.value}"></slot>`).join('')}
      </div>
    `;
  }

  protected override renderCallback() {
    this.shadowRoot!.querySelectorAll('ul > li > button').forEach(($button) =>
      $button.addEventListener('click', (event) => this.onClickTabItem(event)),
    );
  }
}

export default Tabs;

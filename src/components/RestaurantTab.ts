import Component from '../core/Component.ts';
import { TabType } from '../lib/types.ts';
import { html } from '../lib/utils.ts';

interface RestaurantTabProps {
  focusedTab: TabType;
  setTab: (tab: TabType) => void;
}

export default class RestaurantTab extends Component<null, RestaurantTabProps> {
  template() {
    return html`
      <div class="restaurant__tab-list">
        <div
          class="restaurant__tab-item ${this.props?.focusedTab === 'all' ? 'restaurant__tab-item--active' : ''}"
          data-tab="all"
          id="tab-all"
        >
          <span>모든 음식점</span>
        </div>
        <div
          class="restaurant__tab-item ${this.props?.focusedTab === 'like' ? 'restaurant__tab-item--active' : ''}"
          data-tab="like"
          id="tab-like"
        >
          <span>자주 가는 음식점</span>
        </div>
      </div>
    `;
  }

  attachEventListener() {
    this.element?.querySelectorAll('.restaurant__tab-item').forEach((tabItem) => {
      tabItem.addEventListener('click', (event) => {
        this.props?.setTab((event?.currentTarget as HTMLDivElement)?.dataset.tab as TabType);
      });
    });
  }
}

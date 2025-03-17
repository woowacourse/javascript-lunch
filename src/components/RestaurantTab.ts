import type { TabType } from '../lib/types.ts';
import { html } from '../lib/utils.ts';
import { Component } from './core/index.ts';

interface RestaurantTabProps {
  focusedTab: TabType;
  setTab: (tab: TabType) => void;
}

export default class RestaurantTab extends Component<RestaurantTabProps> {
  override template() {
    return html`
      <div class="restaurant__tab-list">
        <div
          class="restaurant__tab-item ${this.props.focusedTab === 'all' ? 'restaurant__tab-item--active' : ''}"
          data-action="tab-change"
          data-tab="all"
        >
          <span>모든 음식점</span>
        </div>
        <div
          class="restaurant__tab-item ${this.props.focusedTab === 'like' ? 'restaurant__tab-item--active' : ''}"
          data-action="tab-change"
          data-tab="like"
        >
          <span>자주 가는 음식점</span>
        </div>
      </div>
    `;
  }
}

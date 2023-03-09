import Component from '../core/Component';
import IRestaurantInput from '../interfaces/IRestaurantInput';
import { IComponentPropState } from '../interfaces/IComponent';
import preferenceTabs from '../constants/preferenceTabs';
import FilterBar from './FilterBar';
import Restaurant from './Restaurant';
import createWrappersForTarget from '../utils/createWrappersForTarget';

class ListContainer extends Component<IComponentPropState> {
  setup() {
    this.$state = {
      activeTab: 'all',
      restaurantListToShow: [...this.$props.restaurantList],
    };
  }

  template() {
    const { activeTab } = this.$state;

    return `
    <div class="tabview">
      <nav class="tabview__nav">
        ${preferenceTabs
          .map(
            (tab) => `
              <button
                class="tabview__nav__button ${
                  activeTab === tab.id ? 'active' : ''
                }"
                data-tab="${tab.id}"
              >
                ${tab.label}
              </button>
            `
          )
          .join('')}
      </nav>
      <div class="restaurant-filter-container-wrapper">
    ${
      this.$state.activeTab === 'all'
        ? `<section class="restaurant-filter-container"></section>`
        : ''
    }
    </div>
      <div class="tabview__content">
      </div>
    </div>
  `;
  }

  mounted() {
    const $filterBar = this.$target.querySelector<HTMLElement>(
      '.restaurant-filter-container'
    );

    const $tabViewContent =
      this.$target.querySelector<HTMLElement>('.tabview__content')!;

    if ($filterBar) {
      new FilterBar($filterBar, {
        filterList: this.$props.filterList,
        filterOptions: this.$props.filterOptions,
      });
    }

    if ($tabViewContent) {
      createWrappersForTarget(
        $tabViewContent,
        this.$props.restaurantList.length,
        'restaurant'
      );

      this.$props.restaurantList.forEach(
        (restaurant: IRestaurantInput, index: number) => {
          const target = this.$target.querySelector<HTMLElement>(
            `#restaurant-${index + 1}`
          )!;
          new Restaurant(target, {
            restaurant,
            updateRootState: this.$props.updateRootState,
          });
        }
      );
    }
  }

  setEvent(): void {
    this.addEvent('click', '.tabview__nav__button', (event: Event) => {
      const tabId = (event.target as HTMLElement).dataset.tab;
      if (tabId) {
        this.setState({ activeTab: tabId });
      }
    });
  }
}

export default ListContainer;

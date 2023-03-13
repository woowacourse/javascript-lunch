import Component from '../core/Component';
import IRestaurantInput from '../interfaces/IRestaurantInput';
import { IComponentPropState } from '../interfaces/IComponent';
import preferenceTabs from '../constants/preferenceTabs';
import FilterBar from './FilterBar';
import restaurant from './Restaurant';
import Restaurant from './Restaurant';
import createWrappersForTarget from '../utils/createWrappersForTarget';

class ListContainer extends Component<IComponentPropState> {
  setup() {
    this.$state = {
      activeTab: 'all',
      restaurantListToShow: this.$props.restaurantList,
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
        : `<section class="restaurant-filter-container">{filteredRestaurants}</section>`
    }
    </div>
      <div class="tabview__content">
      </div>
    </div>
  `;
  }

  getFilteredRestaurants(
    restaurantListToShow: Array<IRestaurantInput>,
    activeTab: 'all' | 'favorites'
  ): Array<IRestaurantInput> {
    switch (activeTab) {
      case 'all':
        return restaurantListToShow;
      case 'favorites':
        return restaurantListToShow.filter(
          (restaurant: IRestaurantInput) => restaurant.isFavorite
        );
    }
  }

  renderRestaurants(filteredRestaurants: Array<IRestaurantInput>) {
    filteredRestaurants.forEach(
      (restaurant: IRestaurantInput, index: number) => {
        const target = this.$target.querySelector<HTMLElement>(
          `#restaurant-${index + 1}`
        )!;
        new Restaurant(target, {
          restaurant,
          originalRestaurantList: this.$props.restaurantList,
          updateRootState: this.$props.updateRootState,
          toggleModal: this.$props.toggleModal,
        });
      }
    );
  }

  mounted() {
    const $filterBar = this.$target.querySelector<HTMLElement>(
      '.restaurant-filter-container'
    );
    const $tabViewContent =
      this.$target.querySelector<HTMLElement>('.tabview__content')!;

    const filteredRestaurants = this.getFilteredRestaurants(
      this.$state.restaurantListToShow,
      this.$state.activeTab
    );

    if ($filterBar) {
      new FilterBar($filterBar, {
        filterList: this.$props.filterList,
        filterOptions: this.$props.filterOptions,
        activeTab: this.$state.activeTab,
      });
    }

    if ($tabViewContent) {
      createWrappersForTarget(
        $tabViewContent,
        filteredRestaurants.length,
        'restaurant'
      );
    }

    this.renderRestaurants(filteredRestaurants);
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

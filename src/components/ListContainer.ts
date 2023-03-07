import Component from '../core/Component';
import IRestaurantInput from '../interfaces/IRestaurantInput';
import { IComponentPropState } from '../interfaces/IComponent';
import imagePaths from '../constants/imagePaths';
import preferenceTabs from '../constants/preferenceTabs';

class ListContainer extends Component<IComponentPropState> {
  setup() {
    this.$state = {
      activeTab: 'all',
    };
  }

  template() {
    const { restaurantList } = this.$props;
    const { activeTab } = this.$state;

    const filteredRestaurants =
      activeTab === 'all'
        ? restaurantList
        : restaurantList.filter(
            (restaurant: IRestaurantInput) => restaurant.isFavorite
          );

    const restaurantListHtml = filteredRestaurants
      .map((restaurant: IRestaurantInput) => {
        const { category, name, distance, description } = restaurant;
        return `<li class="restaurant">
          <div class="restaurant__category">
            <img src=${imagePaths.mainListIconImage[category]} alt=${category} class="category-icon"/>
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 이내</span>
            <p class="restaurant__description text-body">${description}</p>
          </div>
        </li>`;
      })
      .join('');

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
        <div class="tabview__content">
          ${restaurantListHtml}
        </div>
      </div>
    `;
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

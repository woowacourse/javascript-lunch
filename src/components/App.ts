import type RestaurantList from '@/domain/RestaurantList';
import type { TTabMenu } from '@/types/restaurant';

import Component from './core/Component';
import Dropdown from './dropdown/Dropdown';
import Header from './header/Header';
import RestaurantAddModal from './modal/restaurantAddModal/RestaurantAddModal';
import RestaurantDetailModal from './modal/restaurantDetailModal/RestaurantDetailModal';
import RestaurantListContainer from './RestaurantListContainer';
import TabMenu from './tabMenu/TabMenu';

import { FILTERED_CATEGORY, FILTERED_CATEGORY_ATTRIBUTE, SORTING, SORTING_ATTRIBUTE } from '@/constants/filter';
import dom from '@/utils/dom';

interface ICreateDropdown {
  $restaurantFilterContainer: HTMLElement;
  restaurantListContainer: RestaurantListContainer;
  tabKind: TTabMenu;
}

interface Props {
  restaurantList: RestaurantList;
}

class App extends Component<Props> {
  render() {
    const restaurantDetailModal = this.createRestaurantDetailModal();
    const restaurantAddModal = this.createRestaurantAddModal();

    const restaurantListContainer = this.createRestaurantList('all', restaurantDetailModal);
    this.renderHeader(restaurantAddModal);
    this.renderTabMenu(restaurantListContainer);
    this.renderHomeDropdown(restaurantListContainer, 'all');
  }

  createRestaurantDetailModal() {
    const $detailModalContainer = dom.getElement('#detail-modal');
    return new RestaurantDetailModal($detailModalContainer, {
      restaurantList: this.props.restaurantList,
    });
  }

  createRestaurantAddModal() {
    const $addModalContainer = dom.getElement('#add-modal');
    return new RestaurantAddModal($addModalContainer, {
      restaurantList: this.props.restaurantList,
    });
  }

  renderHeader(restaurantAddModal: RestaurantAddModal) {
    new Header(document.body, {
      title: '점심 뭐먹지?',
      imageSrc: './images/add-button.png',
      onClick: () => {
        restaurantAddModal.toggle();
      },
    });
  }

  renderTabMenu(restaurantListContainer: RestaurantListContainer) {
    const $tabContainer = dom.getElement('#tab-container');
    this.renderAllTab($tabContainer, restaurantListContainer);
    this.renderFavoriteTab($tabContainer, restaurantListContainer);
  }

  renderAllTab($tabContainer: HTMLElement, restaurantListContainer: RestaurantListContainer) {
    new TabMenu($tabContainer, {
      attributes: {
        id: 'all-tab',
        classNames: ['tab-item', 'active-tab'],
        text: '모든 음식점',
      },
      clickEvent: () => {
        this.renderHomeDropdown(restaurantListContainer, 'all');
      },
    });
  }

  renderFavoriteTab($tabContainer: HTMLElement, restaurantListContainer: RestaurantListContainer) {
    new TabMenu($tabContainer, {
      attributes: {
        id: 'favorite-tab',
        classNames: ['tab-item'],
        text: '자주 가는 음식점',
      },
      clickEvent: () => {
        this.renderHomeDropdown(restaurantListContainer, 'favorite');
      },
    });
  }

  createRestaurantList(kind: TTabMenu, restaurantDetailModal: RestaurantDetailModal) {
    const $restaurantContainer = dom.getElement('.restaurant-list-container');
    return new RestaurantListContainer({
      $target: $restaurantContainer,
      props: { restaurantList: this.props.restaurantList, kind, restaurantDetailModal },
    });
  }

  renderHomeDropdown(restaurantListContainer: RestaurantListContainer, tabKind: TTabMenu) {
    const $restaurantFilterContainer = dom.getElement('.restaurant-filter-container');
    $restaurantFilterContainer.replaceChildren();
    this.renderCategoryDropdown({ $restaurantFilterContainer, restaurantListContainer, tabKind });
    this.renderSortingDropdown({ $restaurantFilterContainer, restaurantListContainer, tabKind });
  }

  renderCategoryDropdown({ $restaurantFilterContainer, restaurantListContainer, tabKind }: ICreateDropdown) {
    new Dropdown({
      $target: $restaurantFilterContainer,
      props: {
        kind: 'category',
        tabKind,
        attributes: FILTERED_CATEGORY_ATTRIBUTE,
        options: FILTERED_CATEGORY,
        restaurantList: this.props.restaurantList,
        renderRestaurantList: (restaurants: RestaurantList, tabKind: TTabMenu) => {
          restaurantListContainer.renderRestaurantList(restaurants, tabKind);
        },
      },
    });
  }

  renderSortingDropdown({ $restaurantFilterContainer, restaurantListContainer, tabKind }: ICreateDropdown) {
    new Dropdown({
      $target: $restaurantFilterContainer,
      props: {
        kind: 'sorting',
        tabKind,
        attributes: SORTING_ATTRIBUTE,
        options: SORTING,
        restaurantList: this.props.restaurantList,
        renderRestaurantList: (restaurants: RestaurantList, tabKind: TTabMenu) => {
          restaurantListContainer.renderRestaurantList(restaurants, tabKind);
        },
      },
    });
  }
}

export default App;

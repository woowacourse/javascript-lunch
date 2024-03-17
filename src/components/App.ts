import type RestaurantList from '@/domain/RestaurantList';
import type { IRestaurantList, TTabMenu } from '@/types/restaurant';

import Component from './core/Component';
import Dropdown from './dropdown/Dropdown';
import Header from './header/Header';
import RestaurantAddModal from './modal/restaurantAddModal/RestaurantAddModal';
import RestaurantDetailModal from './modal/restaurantDetailModal/RestaurantDetailModal';
import RestaurantListContainer from './RestaurantListContainer';
import TabMenu from './tabMenu/TabMenu';

import { FILTERED_CATEGORY, FILTERED_CATEGORY_ATTRIBUTE, SORTING, SORTING_ATTRIBUTE } from '@/constants/filter';
import dom from '@/utils/dom';

interface Props {
  restaurantList: RestaurantList;
}

class App extends Component<Props> {
  render() {
    const restaurantDetailModal = this.createRestaurantDetailModal();
    const restaurantAddModal = this.createRestaurantAddModal();

    const restaurantList = this.createRestaurantList('all', restaurantDetailModal);
    this.renderHeader(restaurantAddModal);
    this.renderTabMenu(restaurantDetailModal);
    this.renderHomeDropdown(restaurantList);
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

  renderTabMenu(restaurantDetailModal: RestaurantDetailModal) {
    const $tabContainer = dom.getElement('#tab-container');
    this.renderAllTab($tabContainer, restaurantDetailModal);
    this.renderFavoriteTab($tabContainer, restaurantDetailModal);
  }

  renderAllTab($tabContainer: HTMLElement, restaurantDetailModal: RestaurantDetailModal) {
    new TabMenu($tabContainer, {
      attributes: {
        id: 'all-tab',
        classNames: ['tab-item', 'active-tab'],
        text: '모든 음식점',
      },
      clickEvent: () => {
        this.handleClickAllTab(restaurantDetailModal);
      },
    });
  }

  renderFavoriteTab($tabContainer: HTMLElement, restaurantDetailModal: RestaurantDetailModal) {
    new TabMenu($tabContainer, {
      attributes: {
        id: 'favorite-tab',
        classNames: ['tab-item'],
        text: '자주 가는 음식점',
      },
      clickEvent: () => {
        this.handleClickFavoriteTab(restaurantDetailModal);
      },
    });
  }

  handleClickAllTab(restaurantDetailModal: RestaurantDetailModal) {
    this.createRestaurantList('all', restaurantDetailModal);
  }

  handleClickFavoriteTab(restaurantDetailModal: RestaurantDetailModal) {
    this.createRestaurantList('favorite', restaurantDetailModal);
  }

  createRestaurantList(kind: TTabMenu, restaurantDetailModal: RestaurantDetailModal) {
    const $restaurantContainer = dom.getElement('.restaurant-list-container');
    return new RestaurantListContainer({
      $target: $restaurantContainer,
      props: { restaurantList: this.props.restaurantList, kind, restaurantDetailModal },
    });
  }

  renderHomeDropdown(restaurantListContainer: RestaurantListContainer) {
    const $restaurantFilterContainer = dom.getElement('.restaurant-filter-container');
    $restaurantFilterContainer.replaceChildren();
    this.renderCategoryDropdown($restaurantFilterContainer, restaurantListContainer);
    this.renderSortingDropdown($restaurantFilterContainer, restaurantListContainer);
  }

  renderCategoryDropdown($restaurantFilterContainer: HTMLElement, restaurantListContainer: RestaurantListContainer) {
    new Dropdown({
      $target: $restaurantFilterContainer,
      props: {
        kind: 'category',
        attributes: FILTERED_CATEGORY_ATTRIBUTE,
        options: FILTERED_CATEGORY,
        restaurantList: this.props.restaurantList,
        renderRestaurantList: (restaurants: IRestaurantList) => {
          restaurantListContainer.renderRestaurantList(restaurants);
        },
      },
    });
  }

  renderSortingDropdown($restaurantFilterContainer: HTMLElement, restaurantListContainer: RestaurantListContainer) {
    new Dropdown({
      $target: $restaurantFilterContainer,
      props: {
        kind: 'sorting',
        attributes: SORTING_ATTRIBUTE,
        options: SORTING,
        restaurantList: this.props.restaurantList,
        renderRestaurantList: (restaurants: IRestaurantList) => {
          restaurantListContainer.renderRestaurantList(restaurants);
        },
      },
    });
  }
}

export default App;

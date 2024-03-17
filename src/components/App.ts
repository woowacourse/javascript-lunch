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

interface Props {
  restaurantList: RestaurantList;
}

class App extends Component<Props> {
  render() {
    const restaurantDetailModal = this.createRestaurantDetailModal();
    const restaurantAddModal = this.createRestaurantAddModal();

    this.renderHeader(restaurantAddModal);
    this.renderTabMenu(restaurantDetailModal);
    this.renderHomeDropdown();
    this.renderRestaurantList('all', restaurantDetailModal);
  }

  handleClickAllTab(restaurantDetailModal: RestaurantDetailModal) {
    this.renderRestaurantList('all', restaurantDetailModal);
  }

  handleClickFavoriteTab(restaurantDetailModal: RestaurantDetailModal) {
    this.renderRestaurantList('favorite', restaurantDetailModal);
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

  renderRestaurantList(kind: TTabMenu, restaurantDetailModal: RestaurantDetailModal) {
    const $restaurantContainer = dom.getElement('.restaurant-list-container');
    new RestaurantListContainer({
      $target: $restaurantContainer,
      props: { restaurantList: this.props.restaurantList, kind, restaurantDetailModal },
    });
  }

  renderHomeDropdown() {
    const $restaurantFilterContainer = dom.getElement('.restaurant-filter-container');
    $restaurantFilterContainer.replaceChildren();
    this.renderCategoryDropdown($restaurantFilterContainer);
    this.renderSortingDropdown($restaurantFilterContainer);
  }

  renderCategoryDropdown($restaurantFilterContainer: HTMLElement) {
    new Dropdown({
      $target: $restaurantFilterContainer,
      props: {
        kind: 'category',
        attributes: FILTERED_CATEGORY_ATTRIBUTE,
        options: FILTERED_CATEGORY,
        restaurantList: this.props.restaurantList,
      },
    });
  }

  renderSortingDropdown($restaurantFilterContainer: HTMLElement) {
    new Dropdown({
      $target: $restaurantFilterContainer,
      props: {
        kind: 'sorting',
        attributes: SORTING_ATTRIBUTE,
        options: SORTING,
        restaurantList: this.props.restaurantList,
      },
    });
  }
}

export default App;

import type RestaurantListContainer from './restaurantList/RestaurantListContainer';
import type RestaurantList from '@/domain/RestaurantList';

import renderHomeDropdown from './renderHomeDropdown';
import TabMenu from './tabMenu/TabMenu';

import dom from '@/utils/dom';

interface ITabMenu {
  restaurantListContainer: RestaurantListContainer;
  restaurantList: RestaurantList;
}

const renderTabMenu = ({ restaurantListContainer, restaurantList }: ITabMenu) => {
  renderAllTab({ restaurantListContainer, restaurantList });
  renderFavoriteTab({ restaurantListContainer, restaurantList });
};

const renderAllTab = ({ restaurantListContainer, restaurantList }: ITabMenu) => {
  renderHomeDropdown(restaurantListContainer, restaurantList, 'all');
  const $tabContainer = dom.getElement('#tab-container');
  new TabMenu($tabContainer, {
    attributes: {
      id: 'all-tab',
      classNames: ['tab-item', 'active-tab'],
      text: '모든 음식점',
    },
    clickEvent: () => {
      renderHomeDropdown(restaurantListContainer, restaurantList, 'all');
    },
  });
};

const renderFavoriteTab = ({ restaurantListContainer, restaurantList }: ITabMenu) => {
  renderHomeDropdown(restaurantListContainer, restaurantList, 'favorite');
  const $tabContainer = dom.getElement('#tab-container');
  new TabMenu($tabContainer, {
    attributes: {
      id: 'favorite-tab',
      classNames: ['tab-item'],
      text: '자주 가는 음식점',
    },
    clickEvent: () => {
      renderHomeDropdown(restaurantListContainer, restaurantList, 'favorite');
    },
  });
};

export default renderTabMenu;

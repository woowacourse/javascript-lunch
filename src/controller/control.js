import createHeader from '../component/header';
import { closeModal } from '../component/modal/modal.js';
import createTabBar from '../component/tabBar/tabBar.js';
import FavoriteRestaurantList from '../domain/FavoriteRestaurantList';
import { RestaurantManager } from '../domain/RestaurantManager';
import { createAllRestaurantList } from '../page/allRestaurantList.js';
import { createFavoriteRestaurantList } from '../page/favoriteRestaurantList.js';
import { $ } from '../utils/selector.js';

export const set = {
  start(storage) {
    const restaurantListData = storage.get('restaurantList') || [];
    const favoriteRestaurantListData =
      storage.get('favoriteRestaurantList') || [];

    const restaurantManager = new RestaurantManager(
      restaurantListData,
      storage
    );
    const favoriteRestaurantList = new FavoriteRestaurantList(
      favoriteRestaurantListData,
      storage
    );

    this.initPage(restaurantManager, favoriteRestaurantList);
  },

  initPage(restaurantManager, favoriteRestaurantList) {
    document.body.insertAdjacentElement(
      'afterbegin',
      createHeader({
        className: 'gnb',
        left: 'logo',
        right: 'add',
        addRestaurant: (restaurant) => restaurantManager.add(restaurant),
        getRestaurantList: () => restaurantManager.filteredRestaurantList(),
        hasFavorite: favoriteRestaurantList.hasRestaurant,
      })
    );

    const tabBarList = [
      {
        name: '모든 음식점',
        render: () =>
          createAllRestaurantList({
            restaurantManager,
            favoriteRestaurantList,
          }),
      },
      {
        name: '즐겨찾는 음식점',
        render: () =>
          createFavoriteRestaurantList({
            getFavoriteRestaurantList: () =>
              restaurantManager
                .getRestaurantList()
                .filter(({ id }) => favoriteRestaurantList.hasRestaurant(id)),
            favoriteRestaurantList,
          }),
      },
    ];

    createTabBar(tabBarList);
    createAllRestaurantList({ restaurantManager, favoriteRestaurantList });

    this.addEventList({
      restaurantManager,
      favoriteRestaurantList,
      tabBarList,
    });
  },

  addEventList({ restaurantManager, favoriteRestaurantList, tabBarList }) {
    document.body.addEventListener('deleteRestaurantInModal', (event) => {
      const modalContainer = event.target.closest('[class*="restaurant__id"]');
      const restaurantId = Number(
        [...modalContainer.classList]
          .find((className) => className.includes('id'))
          .split('__')
          .pop()
      );

      restaurantManager.delete(restaurantId);

      if (favoriteRestaurantList.hasRestaurant(restaurantId))
        favoriteRestaurantList.deleteRestaurant(restaurantId);

      closeModal();

      const selectedTab =
        $('.tab-bar').querySelector('.selected__tab').textContent;

      tabBarList.find(({ name }) => name === selectedTab).render();
    });

    document.body.addEventListener('starButtonClick', () => {
      const selectedTab =
        $('.tab-bar').querySelector('.selected__tab').textContent;

      tabBarList.find(({ name }) => name === selectedTab).render();
    });
  },
};

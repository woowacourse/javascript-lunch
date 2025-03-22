import {
  openAddRestaurantModal,
  openRestaurantInfoModal,
  closeModal,
  selectSortKey,
  selectCategory,
  deleteRestaurant,
  switchTab,
  readNewRestaurant,
  toggleFavoriteButton,
} from './eventHandlers/index.ts';

import stateStore from './domain/stateStore.ts';
import restaurantService from './service/restaurantService.ts';
import { selectElement } from './utils/dom.ts';
import { RESTAURANTS } from './data/initialData.ts';
import {
  header,
  tab,
  restaurantItems,
  itemsController,
  addRestaurantModal,
  restaurantInfoModal,
} from './components/index.ts';
import {
  createButton,
  createHeader,
  createInput,
  createModal,
  createRestaurantItem,
  createSelect,
  createTextarea,
  createRestaurantInfo,
} from './templates/index.ts';
import {
  ADD_BUTTON,
  ADD_RESTAURANT_MODAL,
  CANCEL_BUTTON,
  CATEGORY,
  CATEGORY_FILTER,
  CLOSE_INFO_BUTTON,
  DELETE_INFO_BUTTON,
  DESCRIPTION,
  DISTANCE,
  FREQUENT_ITEMS_TAB,
  LINK,
  NAME,
  RESTAURANT_INFO_MODAL,
  SORT_SELECTOR,
  TOTAL_ITEMS_TAB,
} from './constants/elements.ts';

addEventListener('load', () => {
  handleAddRestaurantModal();
  handleRestaurantInfoModal();
  closeModal();

  handleHeader();
  handleTab();
  handleItemsController();
  handleRestaurantItems();
});

const handleAddRestaurantModal = () => {
  addRestaurantModal.render({
    modalContainer: createModal(ADD_RESTAURANT_MODAL),
    modalContents: {
      categorySelect: createSelect(CATEGORY),
      nameInput: createInput(NAME),
      distanceSelect: createSelect(DISTANCE),
      descriptionTextarea: createTextarea(DESCRIPTION),
      linkInput: createInput(LINK),
    },
    modalButton: {
      addButton: createButton(ADD_BUTTON),
      cancelButton: createButton(CANCEL_BUTTON),
    },
  });

  addRestaurantModal.setEvent([
    initFormValidation,
    () =>
      readNewRestaurant(restaurantService.addRestaurant.bind(restaurantService), () =>
        restaurantItems.render({
          restaurants: () => filterAndSortRestaurants(),
        }),
      ),
  ]);
};

const handleRestaurantInfoModal = () => {
  restaurantInfoModal.render({
    modalContainer: createModal(RESTAURANT_INFO_MODAL),
    modalButton: {
      deleteButton: createButton(DELETE_INFO_BUTTON),
      closeButton: createButton(CLOSE_INFO_BUTTON),
    },
  });

  restaurantInfoModal.setEvent([
    () => {
      const modalContents = (id: number) => {
        const targetData = restaurantService.getRestaurantById(id);
        return createRestaurantInfo(targetData);
      };

      const renderer = (id: number) => restaurantInfoModal.renderContents({ id, restaurantsInfo: modalContents });
      openRestaurantInfoModal(renderer);
    },

    () =>
      deleteRestaurant(restaurantService.deleteRestaurant.bind(restaurantService), () =>
        restaurantItems.render({
          restaurants: () => filterAndSortRestaurants(),
        }),
      ),
  ]);
};

const handleHeader = () => {
  header.render({ header: createHeader({ title: '점심 뭐 먹지' }) });
  header.setEvent([openAddRestaurantModal]);
};

const handleTab = () => {
  tab.render({
    totalItemsTab: createButton(TOTAL_ITEMS_TAB),
    frequentItemsTab: createButton(FREQUENT_ITEMS_TAB),
  });

  tab.setEvent([
    () =>
      switchTab(stateStore.updateState.bind(stateStore), () =>
        restaurantItems.render({
          restaurants: () => filterAndSortRestaurants(),
        }),
      ),
  ]);
};

const handleItemsController = () => {
  itemsController.render({
    categoryFilter: createSelect(CATEGORY_FILTER),
    sortSelector: createSelect(SORT_SELECTOR),
  });

  itemsController.setEvent([
    () =>
      selectSortKey(stateStore.updateState.bind(stateStore), () =>
        restaurantItems.render({
          restaurants: () => filterAndSortRestaurants(),
        }),
      ),

    () =>
      selectCategory(stateStore.updateState.bind(stateStore), () =>
        restaurantItems.render({
          restaurants: () => filterAndSortRestaurants(),
        }),
      ),
  ]);
};

const handleRestaurantItems = () => {
  initRestaurantItems();

  restaurantItems.render({
    restaurants: () => {
      const restaurantsData = restaurantService.getRestaurants();
      return restaurantsData.map((restaurant) => createRestaurantItem(restaurant)).join('');
    },
  });
  restaurantItems.setEvent([
    () => toggleFavoriteButton(restaurantService.toggleFavorite.bind(restaurantService), updateFavoriteIcon),
  ]);
};

const initRestaurantItems = () => {
  const hasKey = restaurantService.checkHasRestaurantData();
  if (!hasKey) {
    [...RESTAURANTS].forEach((restaurant) => {
      restaurantService.addRestaurant(restaurant);
    });
  }
};

const filterAndSortRestaurants = () => {
  const states = stateStore.getState();
  const restaurantsData = restaurantService.getRestaurants();
  const filteredData = restaurantService.getFilteredRestaurants(states, restaurantsData);
  return filteredData.map((restaurant) => createRestaurantItem(restaurant)).join('');
};

const updateFavoriteIcon = (id: number, favorite: boolean) => {
  const targetItems = document.querySelectorAll(`[data-id="${id}"]`);

  targetItems.forEach((target) => {
    const imageElement = target.querySelector('.restaurant__favorite > img') as HTMLImageElement;

    imageElement.src = favorite ? 'favorite-icon-filled.png' : 'favorite-icon-lined.png';
  });

  const { isFavoriteTab } = stateStore.getState();

  if (isFavoriteTab) {
    restaurantItems.render({
      restaurants: () => filterAndSortRestaurants(),
    });
  }
};

const initFormValidation = () => {
  const nameInputElement = selectElement('#name') as HTMLInputElement;
  const categorySelectElement = selectElement('#category') as HTMLInputElement;
  const distanceSelectElement = selectElement('#distance') as HTMLInputElement;

  setRequired(nameInputElement);
  setRequired(categorySelectElement);
  setRequired(distanceSelectElement);
};

const setRequired = (element: HTMLInputElement) => {
  element.required = true;
};

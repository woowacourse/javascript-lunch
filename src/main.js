import { createRestaurantList, updateRestaurantList } from './components/RestaurantList.js';
import createSectionContainer from './components/SectionContainer.js';
import { RESTAURANT_ITEMS } from '../public/restaurantData.js';
import { createRestaurantEnrollModal } from './components/RestaurantEnrollModal.js';
import createFilterBox from './components/Filters.js';

const program = {
  enrollRestaurantModal: null,
  filteredItems: [...RESTAURANT_ITEMS],

  initUI() {
    const $main = document.getElementsByTagName('main')[0];

    const $filterContainer = createSectionContainer('restaurant-list-container');

    const $filterBox = createFilterBox({
      onCategoryChange: this.handleCategoryFilter.bind(this),
      onSortChange: this.handleSortFilter.bind(this),
    });

    $filterContainer.appendChild($filterBox);
    $filterContainer.appendChild(createRestaurantList(this.filteredItems));

    const $enrollRestaurantModal = createRestaurantEnrollModal(updateRestaurantList);
    this.enrollRestaurantModal = $enrollRestaurantModal;

    $main.append($filterContainer, $enrollRestaurantModal.getElement());
  },

  initEvent() {
    const $openModalButton = document.querySelector('.gnb__button');

    $openModalButton.addEventListener('click', () => {
      this.enrollRestaurantModal.toggle();
    });

    const $backDrop = document.querySelector('.modal-backdrop');

    $backDrop.addEventListener('click', () => {
      this.enrollRestaurantModal.toggle();
    });
  },

  handleCategoryFilter(selectedCategory) {
    this.filteredItems =
      selectedCategory === '전체'
        ? [...RESTAURANT_ITEMS]
        : RESTAURANT_ITEMS.filter((item) => item.category === selectedCategory);

    this.updateRestaurantList();
  },

  handleSortFilter(selectedSort) {
    if (selectedSort === 'name') {
      this.filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort === 'distance') {
      this.filteredItems.sort((a, b) => Number(a.distance) - Number(b.distance));
    }

    this.updateRestaurantList();
  },

  updateRestaurantList() {
    const $filteredList = createRestaurantList(this.filteredItems);
    const $container = document.querySelector('.restaurant-list-container');

    const oldList = $container.querySelector('.restaurant-list');
    if (oldList) oldList.remove();
    $container.appendChild($filteredList);
  },
};

program.initUI();
program.initEvent();

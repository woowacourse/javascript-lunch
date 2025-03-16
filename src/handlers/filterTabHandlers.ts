import createMultiSelect from '../components/MultiSelect.js';
import { CATEGORY_FILTER_SELECT, SORTING_FILTER_SELECT } from '../constants/constants.ts';
import { updateRestaurantListBasedOnActiveTab } from '../utils/updateRestaurantList.ts';

function registerFilterTabClick() {
  const tabs = document.querySelectorAll('.tab');
  if (!tabs) return;
  tabs.forEach((tab) => {
    tab.addEventListener('click', function (this: HTMLElement, event: Event) {
      tabs.forEach((t) => t.classList.remove('active'));
      this.classList.add('active');

      if (this.id === 'all') {
        showCategoryFilterSelect();
        updateRestaurantListBasedOnActiveTab();
        return;
      }
      hideCategoryFilterSelect();
      updateRestaurantListBasedOnActiveTab();
    });
  });
}

function showCategoryFilterSelect() {
  const filterContainer = document.querySelector('.restaurant-filter-container');
  if (!filterContainer) return;
  filterContainer.textContent = '';
  filterContainer.insertAdjacentHTML('beforeend', createMultiSelect(CATEGORY_FILTER_SELECT));
  filterContainer.insertAdjacentHTML('beforeend', createMultiSelect(SORTING_FILTER_SELECT));
}

function hideCategoryFilterSelect() {
  const filterContainer = document.querySelector('.restaurant-filter-container');
  if (!filterContainer) return;
  filterContainer.textContent = '';
}

export default registerFilterTabClick;

import RestaurantList from '../components/RestaurantList';

const DropdownEvent = {
  addCategoryDropdownEventListener: (restaurantListComponent: RestaurantList) => {
    const categorySelect = document.getElementById('category-select');

    categorySelect?.addEventListener('change', (event) => {
      const target = event.target as HTMLSelectElement;
      const selectedValue = target.value;

      restaurantListComponent.updateCategoryFilter(selectedValue);
    });
  },

  addSortDropdownEventListener: (restaurantListComponent: RestaurantList) => {
    const sortSelect = document.getElementById('sort-select');

    sortSelect?.addEventListener('change', (event) => {
      const target = event.target as HTMLSelectElement;
      const selectedValue = target.value;

      restaurantListComponent.updateSortCondition(selectedValue);
    });
  },
};

export default DropdownEvent;

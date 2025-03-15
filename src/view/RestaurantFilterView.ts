import RestaurantFilterContainer from '../components/filter/RestaurantFilterContainer';
import { $ } from '../util/selector';

const RestaurantFilterView = {
  render() {
    const main = $('main');
    const tabContainer = $('.restaurant-tab-container');

    const filterContainer = RestaurantFilterContainer();
    if (tabContainer) {
      tabContainer.after(filterContainer);
    } else {
      main?.appendChild(filterContainer);
    }
  },

  remove() {
    const filterContainer = $('.restaurant-filter-container');
    filterContainer?.remove();
  },
};

export default RestaurantFilterView;

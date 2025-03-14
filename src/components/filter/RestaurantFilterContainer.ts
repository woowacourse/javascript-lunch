import createDOMElement from '../../util/createDomElement';
import CategoryFilter from './CategoryFilter';
import SortFilter from './SortFilter';

function RestaurantFilterContainer() {
  return createDOMElement({
    tag: 'section',
    class: 'restaurant-filter-container',
    children: [CategoryFilter(), SortFilter()],
  });
}

export default RestaurantFilterContainer;

import RestaurantFilter from '../../../components/filter/RestaurantFilter';
import { Category } from '../../../../Domain/types/FilterOptionType';
import { CATEGORY_LIST } from '../../../../Domain/constants/FilterOption';

class CategoryFilter {
  private filter: RestaurantFilter<Category>;

  constructor(onChange?: (category: Category) => void) {
    this.filter = new RestaurantFilter<Category>(CATEGORY_LIST, onChange);
    this.filter.getElement().id = 'category-filter';
    this.filter.getElement().name = 'category';
  }

  getElement(): HTMLSelectElement {
    return this.filter.getElement();
  }

  getValue(): Category {
    return this.filter.getValue();
  }
}

export default CategoryFilter;

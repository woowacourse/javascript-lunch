import RestaurantFilter from '../../../components/filter/RestaurantFilter';
import { Category, FilterOption } from '../../../../Domain/types/FilterOption';

class CategoryFilter {
  private filter: RestaurantFilter<Category>;

  constructor(onChange?: (category: Category) => void) {
    const categories: Category[] = ['전체', '한식', '중식', '일식', '양식', '아시안', '기타'];
    const categoryOptions: FilterOption<Category>[] = categories.map((category) => ({
      value: category,
      text: category,
    }));

    this.filter = new RestaurantFilter<Category>(categoryOptions, onChange);
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

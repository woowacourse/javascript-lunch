import RestaurantFilter from '../../../components/filter/RestaurantFilter';

const CATEGORY_LIST = [
  ['전체', '전체'],
  ['한식', '한식'],
  ['중식', '중식'],
  ['일식', '일식'],
  ['양식', '양식'],
  ['아시안', '아시안'],
  ['기타', '기타'],
];

class CategoryFilter {
  private filter: RestaurantFilter;

  constructor(onChange?: (category: string) => void) {
    const categoryOptions = CATEGORY_LIST.map(([value, text]) => ({ value, text }));

    this.filter = new RestaurantFilter(categoryOptions, onChange);
    this.filter.getElement().id = 'category-filter';
    this.filter.getElement().name = 'category';
  }

  getElement(): HTMLSelectElement {
    return this.filter.getElement();
  }

  getValue(): string {
    return this.filter.getValue();
  }
}

export default CategoryFilter;

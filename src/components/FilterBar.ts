import { Category, Order } from '../constants/enum';
import Component from '../core/Component';
import { IComponentPropState } from '../interfaces/IComponent';

class FilterBar extends Component<IComponentPropState> {
  template() {
    const { activeTab } = this.$props;
    const { category, order } = this.$props.filterOptions;

    if (activeTab === 'all') {
      return `<select name="category" id="category-filter" class="restaurant-filter">
    <option value="전체" ${
      category === Category.All && 'selected'
    }>전체</option>
    <option value="한식" ${
      category === Category.Korean && 'selected'
    }>한식</option>
    <option value="중식" ${
      category === Category.Chinese && 'selected'
    }>중식</option>
    <option value="일식" ${
      category === Category.Japanese && 'selected'
    }>일식</option>
    <option value="양식" ${
      category === Category.Western && 'selected'
    }>양식</option>
    <option value="아시안" ${
      category === '아시안' && 'selected'
    }>아시안</option>
    <option value="기타" ${category === '기타' && 'selected'}>기타</option>
  </select>

  <!-- 정렬 셀렉트 박스 -->
  <select name="sorting" id="sorting-filter"  class="restaurant-filter">
    <option value="name" ${order === Order.Name && 'selected'}>이름순</option>
    <option value="distance" ${
      order === Order.Distance && 'selected'
    }>거리순</option>
  </select>`;
    }
    return '';
  }

  getSortValues() {
    const categoryValue = (
      this.$target.querySelector('#category-filter') as HTMLSelectElement
    ).value;

    const sortValue = (
      this.$target.querySelector('#sorting-filter') as HTMLSelectElement
    ).value;

    return { categoryValue, sortValue };
  }

  setEvent() {
    const { filterList } = this.$props;

    this.addEvent('change', '#category-filter', () => {
      const sortValues = this.getSortValues();
      filterList(sortValues.categoryValue, sortValues.sortValue);
    });

    this.addEvent('change', '#sorting-filter', () => {
      const sortValues = this.getSortValues();
      filterList(sortValues.categoryValue, sortValues.sortValue);
    });
  }
}

export default FilterBar;

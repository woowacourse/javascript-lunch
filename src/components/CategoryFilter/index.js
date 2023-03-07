import { CATEGORIES } from '../../constants/formCondition';
import { $ } from '../../utils/dom';

const CategoryFilter = {
  render() {
    $('.restaurant-filter-container').insertAdjacentHTML('afterbegin', this.getTemplate());
  },

  getTemplate() {
    return `
    <select name="category" id="category-filter" class="restaurant-filter">
      <option value="전체">전체</option>
      ${CATEGORIES.reduce(
        (html, category) => html + `<option value="${category}">${category}</option>`,
        ''
      )}
    </select>`;
  },
};

export default CategoryFilter;

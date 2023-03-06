import { CATEGORIES } from '../../constants/formCondition';
import { $ } from '../../utils/dom';

const CategorySelectbox = {
  render() {
    $('.form-category-container').insertAdjacentHTML('beforeend', this.getTemplate());
  },

  getTemplate() {
    return `
    <select name="category" id="category" required>
      <option value="">선택해 주세요</option>
      ${CATEGORIES.reduce(
        (html, category) => html + `<option value="${category}">${category}</option>`,
        ''
      )}
    </select>`;
  },
};

export default CategorySelectbox;

import { CATEGORIES, OPTION_START_INDEX } from '../../../utils/constants';

const category = () => {
  return `          
    <label for="category text-caption">카테고리</label>
    <select name="category" id="category" required>
      <option value="">선택해 주세요</option>
      ${CATEGORIES.slice(OPTION_START_INDEX)
        .map((category) => `<option value="${category}">${category}</option>`)
        .join('')}
    </select>`;
};

export default category;

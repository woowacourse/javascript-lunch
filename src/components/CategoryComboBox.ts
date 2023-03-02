const CategoryComboBox = `<select name="category" id="category-filter" class="restaurant-filter">
${['전체', '한식', '중식', '일식', '양식', '아시안', '기타']
  .map((category) => `<option value="${category}">${category}</option>`)
  .join('')}
</select>`;

export default CategoryComboBox;

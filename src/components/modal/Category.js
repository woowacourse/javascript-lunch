const Category = () => {
  return /*html*/ `
    <div class="form-item form-item--required">
      <label for="category text-caption">카테고리</label>
      <select name="category" id="category" required>
        <option value="">선택해 주세요</option>
        <option value="한식">한식</option>
        <option value="중식">중식</option>
        <option value="일식">일식</option>
        <option value="양식">양식</option>
        <option value="아시안">아시안</option>
        <option value="기타">기타</option>
      </select>
    </div>
  `;
};

export default Category;

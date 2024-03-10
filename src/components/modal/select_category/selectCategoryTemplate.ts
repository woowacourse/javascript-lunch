import { CATEGORIES } from "../../../constants/system";

const selectCategoryTemplate = /*html*/ `
<div class="form-item form-item--required">
  <label for="category text-caption">카테고리</label>
  <select name="category" id="category" required>
    <option value="">선택해 주세요</option>
    ${Object.values(CATEGORIES)
      .map((category) => `<option value="${category}">${category}</option>`)
      .join("\n")}
  </select>
</div>`;

export default selectCategoryTemplate;

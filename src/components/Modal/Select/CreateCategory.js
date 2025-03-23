import { CATEGORIES } from "../../../constants/constants.js";

const createCategory = () => {
  const addRestaurantForm = document.querySelector(".addRestaurantForm");
  const category = `
  <div class="form-item form-item--required">
    <label for="category text-caption">카테고리</label>
    <select name="category" id="category" required>
    <option value="">선택해 주세요</option>
    ${CATEGORIES.map(
      (category) => `<option value="${category}">${category}</option>`
    )}
  </select>
  </div>
`;

  addRestaurantForm.insertAdjacentHTML("beforeend", category);
};

export default createCategory;

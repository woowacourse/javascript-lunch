import { RESTAURANT_RULES } from "../../../constants/rules.js";
import FormFieldContainer from "./FormFieldContainer.js";

const Category = () => {
  const label = "카테고리";
  const name = "category";
  const required = true;

  const contents = /*html*/ `
    <select name="category" id="category" required data-testid="category">
      <option value="">선택해 주세요</option>
      ${RESTAURANT_RULES.CATEGORIES.map(
        (option) => `<option value="${option}">${option}</option>`
      ).join("")}
    </select>
  `;

  return FormFieldContainer({ contents, required, label, name });
};

export default Category;

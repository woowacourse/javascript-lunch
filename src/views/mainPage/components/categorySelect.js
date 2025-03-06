import dropDown from "../../../components/@common/dropDown";
import { categoryOptions } from "../../../constants/options";
import { $ } from "../../../utils/domHelpers";

const categorySelect = () => {
  const $categorySelectContainer = $(".category-select");

  $categorySelectContainer.innerHTML = `
    ${dropDown({
      id: "category",
      labelText: "카테고리",
      options: categoryOptions,
      isRequired: true,
    })}
  `;

  return $categorySelectContainer;
};

export default categorySelect;

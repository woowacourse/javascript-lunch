import dropDown from "../../../../components/@common/dropDown";
import { CATEGORY_OPTIONS } from "../../../../constants/options";

const categorySelect = () => {
  return dropDown({
    id: "category",
    labelText: "카테고리",
    options: CATEGORY_OPTIONS,
    isRequired: true,
  });
};

export default categorySelect;

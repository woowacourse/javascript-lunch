import SelectBox from "../../common/selectBox/SelectBox.js";
import { CATEGORY } from "../../../constants/constants.js";

export default function CategorySelect() {
  const $categorySelect = SelectBox({
    label: "category",
    options: CATEGORY,
  });

  return $categorySelect;
}

import SelectBox from "../../common/select-box/SelectBox.js";
import { CATEGORY } from "../../../constants/constants.js";

export default class CategorySelect {
  render() {
    const $categorySelect = new SelectBox({
      label: "category",
      options: CATEGORY,
    }).render();

    return $categorySelect;
  }
}

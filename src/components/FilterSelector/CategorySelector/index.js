import { FOOD_CATEGORY } from "../../../constants/foodCategory";
import createKeyValuePair from "../../../utils/createKeyValuePair";
import Select from "../../common/Select";

const CategorySelector = (handleSeletedCatetoryChanged) => {
  const events = {
    change: (e) => handleSeletedCatetoryChanged(e),
  };

  return Select({
    name: "category-sorting",
    required: false,
    options: createKeyValuePair(
      Object.keys(FOOD_CATEGORY),
      Object.keys(FOOD_CATEGORY)
    ),
    defaultOptionText: "전체",
    events,
  });
};

export default CategorySelector;

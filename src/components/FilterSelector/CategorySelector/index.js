import { FOOD_CATEGORY } from "../../../constants/foodCategory";
import createKeyValuePair from "../../../utils/createKeyValuePair";
import Select from "../../common/Select";

const CategorySelector = () => {
  return Select({
    name: "category",
    required: false,
    options: createKeyValuePair(
      Object.keys(FOOD_CATEGORY),
      Object.keys(FOOD_CATEGORY)
    ),
    defaultOptionText: "전체",
  });
};

export default CategorySelector;

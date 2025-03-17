import { FOOD_CATEGORY } from "../../../constants/foodCategory";
import storage from "../../../domain/storage.ts";
import renderFilteredRestaurants from "../../../ui/renderFilteredRestaurant.js";
import createKeyValuePair from "../../../utils/createKeyValuePair";
import Select from "../../common/Select";

const CategorySelector = (restaurantList) => {
  const events = {
    change: (e) => {
      storage.saveCategory(e.target.value);
      restaurantList.setCategory(e.target.value);
      renderFilteredRestaurants(restaurantList);
    },
  };

  return Select({
    name: "category",
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

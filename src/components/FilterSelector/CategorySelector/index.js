import changeModalContents from "../../../changeModalContents";
import { FOOD_CATEGORY } from "../../../constants/foodCategory";
import storage from "../../../domain/storage.ts";
import renderFilteredRestaurants from "../../../renderFilteredRestaurant";
import createRestaurantCards from "../../../service/createRestaurantCards";
import renderRestaurants from "../../../ui/renderRestaurant";
import createKeyValuePair from "../../../utils/createKeyValuePair";
import { $ } from "../../../utils/dom";
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

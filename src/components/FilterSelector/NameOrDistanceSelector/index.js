import changeModalContents from "../../../changeModalContents";
import storage from "../../../domain/storage.ts";
import renderFilteredRestaurants from "../../../renderFilteredRestaurant";
import createRestaurantCards from "../../../service/createRestaurantCards";
import createKeyValuePair from "../../../utils/createKeyValuePair";
import { $ } from "../../../utils/dom";
import Select from "../../common/Select";

const NameOrDistanceSelector = (restaurantList) => {
  const events = {
    change: (e) => {
      storage.saveNameOrDistance(e.target.value);
      restaurantList.setNameOrDistance(e.target.value);
      renderFilteredRestaurants(restaurantList);
    },
  };

  return Select({
    name: "sorting",
    required: false,
    options: createKeyValuePair(["name", "distance"], ["이름순", "거리순"]),
    defaultOptionText: "전체",
    events,
  });
};

export default NameOrDistanceSelector;

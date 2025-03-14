import createRestaurantCards from "../../../service/createRestaurantCards";
import renderRestaurants from "../../../ui/renderRestaurant";
import createKeyValuePair from "../../../utils/createKeyValuePair";
import Select from "../../common/Select";

const NameOrDistanceSelector = (restaurantList) => {
  const events = {
    change: (e) => {
      restaurantList.setNameOrDistance(e.target.value);
      renderRestaurants(createRestaurantCards(restaurantList.filter()));
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

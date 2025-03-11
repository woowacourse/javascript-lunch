import createElement from "../../util/createElement.js";
import Select from "../util/Select.js";

export default function RestaurantFilterContainer(restaurantItems) {
  const $restaurantFilterContainer = createElement({
    tag: "section",
    classNames: ["restaurant-filter-container"],
  });

  $restaurantFilterContainer.append(
    Select({
      name: "category",
      id: "category-filter",
      classNames: ['restaurant-filter'],
      options: ["전체", "한식", "중식", "일식", "양식", "아시안", "기타"],
      selectedValue: '한식',
    })
  );

  $restaurantFilterContainer.append(
    Select({
      name: "sorting",
      id: "sorting-filter",
      classNames: ['restaurant-filter'],
      options: ["이름순", "거리순"],
      selectedValue: '이름순',
    })
  );

  
  return $restaurantFilterContainer;
}

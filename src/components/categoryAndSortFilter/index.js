import { FOOD_CATEGORY } from "../../constants/foodCategory";
import { restaurantList } from "../../restaurantList";
import Select from "../common/select";
import Restaurants from "../restaurants";

const CategoryAndSortFilter = () => {
  const filterContainer = document.createElement("section");
  filterContainer.classList.add("restaurant-filter-container");

  filterContainer.appendChild(
    Select({
      hasDefaultOption: true,
      name: "category",
      options: [
        { label: "전체", value: "all" },
        ...Object.keys(FOOD_CATEGORY).map((key) => ({
          label: FOOD_CATEGORY[key],
          value: key,
        })),
      ],
      onChange: (e) => {
        console.log(restaurantList);
        const filterdRestaurant = restaurantList.filter(
          (restaurant) => restaurant.info.category === e.target.value
        );
        console.log(filterdRestaurant);
        Restaurants(...filterdRestaurant);
      },
    })
  );

  filterContainer.appendChild(
    Select({
      hasDefaultOption: true,
      name: "sorting",
      options: [
        { label: "이름순", value: "name" },
        { label: "거리순", value: "distance" },
      ],
    })
  );
  return filterContainer;
};

export default CategoryAndSortFilter;

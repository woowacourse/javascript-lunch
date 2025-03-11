import { FOOD_CATEGORY } from "../../constants/foodCategory";
import Select from "../common/select";

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
          label: key,
          value: FOOD_CATEGORY[key],
        })),
      ],
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

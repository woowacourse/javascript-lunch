import { FOOD_CATEGORY } from "../../constants/foodCategory";
import Select from "../common/select";

const CategoryAndSortFilter = ({ onSortByCategory, onSortByOption }) => {
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
      onChange: (e) => onSortByCategory(e.target.value),
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
      onChange: (e) => onSortByOption(e.target.value),
    })
  );
  return filterContainer;
};

export default CategoryAndSortFilter;

import Select from "./components/Select.js";
import options from "./constants/options.js";
import querySelector from "./utils/querySelector";

export const restaurantFilter = () => {
  const categorySelect = Select({
    tag: "select",
    name: "category",
    id: "category-filter",
    classList: ["restaurant-filter"],
    options: options.sortCategory,
  });

  querySelector(".restaurant-filter-container").appendChild(categorySelect);

  const sortSelect = Select({
    tag: "select",
    name: "sorting",
    id: "sorting-filter",
    class: ["restaurant-filter"],
    options: options.sortFilter,
  });

  querySelector(".restaurant-filter-container").appendChild(sortSelect);
};

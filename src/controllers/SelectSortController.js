import SelectField from "../components/Form/SelectField.js";
import List from "../components/List.js";
import { SELECT_CATEGORY, SELECT_FILTER, SELECT_SORT } from "../contants.js";
import RestaurantList from "../domain/RestaurantList.ts";
import { formatCategory, formatFilter, formatSort } from "../utils/format.js";
import { getRestaurantStorage } from "../utils/store.js";

function SelectSortController(app, listContainerElement) {
  let currentFilter = "전체";
  let currentSort = "";

  function updateList() {
    const storedRestaurants = getRestaurantStorage("restaurant");
    const restaurantList = new RestaurantList(storedRestaurants);

    let filteredRestaurants = restaurantList.restaurants.filter((restaurant) => {
      if (currentFilter === "전체") {
        return true;
      }
      return restaurant.information.category === currentFilter;
    });

    if (currentSort === "이름순") {
      filteredRestaurants = filteredRestaurants.sort((a, b) => a.information.name.localeCompare(b.information.name));
    } else if (currentSort === "거리순") {
      filteredRestaurants = filteredRestaurants.sort(
        (a, b) => parseInt(a.information.distance) - parseInt(b.information.distance),
      );
    }

    listContainerElement.innerHTML = "";
    const listElement = List(filteredRestaurants, restaurantList);
    listContainerElement.appendChild(listElement);
    app.appendChild(listContainerElement);
  }

  const divElement = document.createElement("div");
  divElement.classList.add("select-sort-container");

  const filterComponent = SelectField({
    tag: "select",
    type: "select",
    name: "filter",
    values: formatFilter(SELECT_FILTER),
    selectedOption: (event) => {
      currentFilter = event.target.value;
      updateList();
    },
  });

  const sortComponent = SelectField({
    tag: "select",
    type: "select",
    name: "sort",
    values: formatSort(SELECT_SORT),
    selectedOption: (event) => {
      currentSort = event.target.value;
      updateList();
    },
  });

  divElement.appendChild(filterComponent);
  divElement.appendChild(sortComponent);
  app.appendChild(divElement);
}

export default SelectSortController;

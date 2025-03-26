import toElement from "../utils/toElement.js";
import MOCK_ITEM from "../mockItem.js";
import RestaurantContainer from "./RestaurantContainer.js";

function Select({ name, id, className, dropdownList }, restaurantList) {
  const $el = toElement(
    `  <select name=${name} id=${id} class=${id}>
              ${dropdownList
                .map(
                  ({ label, value }) =>
                    `<option value="${value}">${label}</option>`
                )
                .join("\n")}
              </select>
  `
  );

  $el.addEventListener("change", function (event) {
    const { id, value } = event.target;

    if (id === "sorting-filter") {
      if (value === "name") {
        restaurantList.sortByName();
        RestaurantContainer(restaurantList);
      }
      if (value === "distance") {
        restaurantList.sortByDistance();
        RestaurantContainer(restaurantList);
      }
    }

    if (id === "category-filter") {
      if (event.target.value === "") {
        restaurantList.resetFilter();
        RestaurantContainer(restaurantList);
        return;
      }

      restaurantList.setCategoryTab(event.target.value);
      RestaurantContainer(restaurantList);
    }
  });

  return $el;
}

export default Select;

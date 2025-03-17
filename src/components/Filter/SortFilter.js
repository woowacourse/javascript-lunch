import RestaurantList from "../../Restaurant/RestaurantList";

const createSortFilter = (restaurantList) => {
  const addrestaurant_filter_container = document.querySelector(
    ".restaurant-filter-container"
  );
  const sortFilter = `<div>
  <select name="sorting" id="sort-filter" class="restaurant-filter">
    <option value="name" ${
      restaurantList.selectedSort === "name" ? "selected" : ""
    }>이름순</option>
    <option value="distance" ${
      restaurantList.selectedSort === "distance" ? "selected" : ""
    }>거리순</option>
  </select>
  <p id="sort-filter-result"></p>
</div>`;

  addrestaurant_filter_container.insertAdjacentHTML("beforeend", sortFilter);

  const selectElement = document.getElementById("sort-filter");
  selectElement.addEventListener("change", showSelectedSortRestaurantList);

  function showSelectedSortRestaurantList(e) {
    const selectedSort = e.target.value;
    restaurantList.setSelectedSort(selectedSort);
    restaurantList.createRestaurantList();
    const selectElement = document.getElementById("sort-filter");
    selectElement.value = selectedSort;
  }
};

export default createSortFilter;

import RestaurantList from "../../Restaurant/RestaurantList";

const createSortFilter = (restaurantList) => {
  const addrestaurant_filter_container = document.querySelector(
    ".restaurant-filter-container"
  );
  const sortFilter = `<div>
  <select name="sorting" id="sort-filter" class="restaurant-filter">
    <option value="name">이름순</option>
    <option value="distance">거리순</option>
  </select>
    <p id="sort-filter-result"></p>
    </div>
  `;

  addrestaurant_filter_container.insertAdjacentHTML("beforeend", sortFilter);

  const selectElement = document.getElementById("sort-filter");
  selectElement.addEventListener("change", (event) =>
    handleOnChange(event.target)
  );

  function handleOnChange(selectedSort) {
    const text = selectedSort.options[selectedSort.selectedIndex].text;
    const selectedSortResult = document.getElementById("sort-filter-result");
    showSelectedSortRestaurantList(text);
  }

  function showSelectedSortRestaurantList(selectedSort) {
    restaurantList.setSelectedSort(selectedSort);
    restaurantList.createRestaurantList();
    const selectElement = document.getElementById("sort-filter");
    selectElement.value = selectedSort;
    //document.getElementById("sort-filter").value = selectedSort;
  }

  // function handleOnChange(event) {
  //   showSelectedSortRestaurantList(event.target.value); // value 사용
  // }

  // function showSelectedSortRestaurantList(selectedSort) {
  //   restaurantList.setSelectedSort(selectedSort);
  //   restaurantList.createRestaurantList();
  //   document.getElementById("sort-filter").value = selectedSort;
  // }
};

export default createSortFilter;

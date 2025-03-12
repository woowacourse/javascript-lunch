const createSortFilter = () => {
  const addrestaurant_filter_container = document.querySelector(
    ".restaurant-filter-container"
  );
  const sortFilter = `
  <select name="sorting" id="sorting-filter" class="restaurant-filter">
    <option value="name">이름순</option>
    <option value="distance">거리순</option>
  </select>
  `;

  addrestaurant_filter_container.insertAdjacentHTML("beforeend", sortFilter);
};

export default createSortFilter;

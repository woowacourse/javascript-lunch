const $filterContainer = (filters) => {
  const container = document.createElement("section");
  container.classList.add("restaurant-filter-container");

  filters.forEach((filter) => {
    container.appendChild(filter);
  });

  return container;
};

export default $filterContainer;

let filterState = {
  category: "",
  sortOption: "name",
};

export function updateFilterState(newState) {
  filterState = {
    ...filterState,
    ...newState,
  };
}

export function sortFilter(items) {
  if (!Array.isArray(items)) return items;
  let filtered = items.map((item, index) => ({
    ...item,
    dataIndex: index,
  }));

  if (filterState.category) {
    filtered = filtered.filter(
      (item) => item.category === filterState.category
    );
  }

  if (filterState.sortOption === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (filterState.sortOption === "distance") {
    filtered.sort((a, b) => Number(a.distance) - Number(b.distance));
  }

  return filtered;
}

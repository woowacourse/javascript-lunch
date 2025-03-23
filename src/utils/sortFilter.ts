interface FilterState {
  category: string;
  sortOption: "name" | "distance";
}

let filterState: FilterState = {
  category: "",
  sortOption: "name",
};

export function updateFilterState(newState: Partial<FilterState>): void {
  filterState = {
    ...filterState,
    ...newState,
  };
}

interface Item {
  category: string;
  name: string;
  distance: string | number;
}

export function sortFilter<T extends Item>(items: T[]): T[] {
  if (!Array.isArray(items)) return items;

  let filtered = items.map((item) => ({
    ...item,
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

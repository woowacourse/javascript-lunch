import { CategoryType, SortByType } from "../entities";

export const handleCategoryFilterChange = (instance: any, event: Event) => {
  const selectedValue = (event.target as HTMLSelectElement).value;
  instance.setState({ categoryFilter: selectedValue as CategoryType });
};

export const handleSortByFilterChange = (instance: any, event: Event) => {
  const selectedValue = (event.target as HTMLSelectElement).value;
  instance.setState({ sortBy: selectedValue as SortByType });
};

export const handleTabChange = (instance: any, event: Event) => {
  const $target = event.target as HTMLElement;
  const selectedValue = $target.dataset.tab!;

  const $tabs = document.querySelectorAll("#tabBar button");
  $tabs.forEach(($tab) => {
    $tab.classList.remove("active");
  });
  $target.classList.add("active");

  instance.setState({ currentTab: selectedValue });
};

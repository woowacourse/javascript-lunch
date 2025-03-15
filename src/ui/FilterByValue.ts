interface FilterProps {
  e: Event;
  $allRestaurants: HTMLElement[];
  $restaurantList: HTMLDivElement;
}

export default function FilterByValue() {
  const $categorySelect = document.getElementById(
    "category-filter"
  ) as HTMLSelectElement | null;
  const $restaurantList = document.querySelector(
    ".restaurant-list"
  ) as HTMLDivElement | null;
  const $allRestaurants = Array.from(
    document.querySelectorAll(".restaurant")
  ) as HTMLElement[];

  if (!$categorySelect || !$restaurantList) return;

  $categorySelect.addEventListener("change", (e) => {
    FilterByValueEvent({ e, $allRestaurants, $restaurantList });
  });
}

function FilterByValueEvent({
  e,
  $allRestaurants,
  $restaurantList,
}: FilterProps) {
  const target = e.target as HTMLSelectElement | null;
  if (!target) return;

  const selectedValue = target.value;

  if (selectedValue === "전체") {
    updateRestaurantList($restaurantList, $allRestaurants);
    return;
  }

  const filteredItems = $allRestaurants.filter((item) => {
    const category = item.querySelector(
      ".category-icon"
    ) as HTMLImageElement | null;
    return category?.alt === selectedValue;
  });

  updateRestaurantList($restaurantList, filteredItems);
}

function updateRestaurantList(
  $restaurantList: HTMLDivElement,
  items: HTMLElement[]
) {
  $restaurantList.innerHTML = "";
  items.forEach((item) => $restaurantList.appendChild(item));
}

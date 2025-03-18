interface FilterProps {
  e: Event;
  $allRestaurants: HTMLElement[];
  $restaurantList: HTMLDivElement;
}

export default function FilteredRestaurant() {
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

  const categoryValue = target.value;

  const filteredRestaurants = FilterRestaurantByCategory(
    categoryValue,
    $allRestaurants
  );

  updateRestaurantList($restaurantList, filteredRestaurants);
}

function updateRestaurantList(
  $restaurantList: HTMLDivElement,
  filteredRestaurants: HTMLElement[]
) {
  $restaurantList.replaceChildren(...filteredRestaurants);
}

function FilterRestaurantByCategory(
  category: string,
  restaurants: HTMLElement[]
): HTMLElement[] {
  if (category === "전체") return restaurants;

  return restaurants.filter((item) => {
    const categoryElement = item.querySelector(
      ".category-icon"
    ) as HTMLImageElement | null;
    return categoryElement?.alt === category;
  });
}

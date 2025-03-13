interface FilterProps {
  e: Event;
  allRestaurants: HTMLElement[];
  $restaurantList: HTMLDivElement;
}

export default function FilterByValue() {
  const $categorySelect = document.getElementById(
    "category-filter"
  ) as HTMLSelectElement;
  const $restaurantList = document.querySelector(
    ".restaurant-list"
  ) as HTMLDivElement;
  const allRestaurants: HTMLElement[] = Array.from(
    document.querySelectorAll(".restaurant")
  );

  $categorySelect.addEventListener("change", (e: Event) => {
    FilterByValueEvent({ e, allRestaurants, $restaurantList });
  });
}

function FilterByValueEvent({
  e,
  allRestaurants,
  $restaurantList,
}: FilterProps) {
  const target = e.target as HTMLSelectElement;
  if (target.value === "전체") {
    $restaurantList.innerHTML = "";
    allRestaurants.forEach((item) => {
      $restaurantList.appendChild(item);
    });
    return;
  }
  const filteredItems = allRestaurants.filter((item) => {
    const category = item.querySelector(".category-icon") as HTMLImageElement;

    return category?.alt === target.value;
  });

  $restaurantList.innerHTML = "";
  filteredItems.forEach((item) => {
    $restaurantList.appendChild(item);
  });
}

interface SortProps {
  $restaurantList: HTMLUListElement;
  $restaurantItems: HTMLElement[];
}

export default function OrderByValue() {
  const $sortSelect = document.getElementById(
    "sorting-filter"
  ) as HTMLSelectElement;

  $sortSelect.addEventListener("change", (e) => {
    const $restaurantList = document.querySelector(
      ".restaurant-list"
    ) as HTMLUListElement;
    const $restaurantItems: HTMLElement[] = Array.from(
      document.querySelectorAll(".restaurant")
    );

    const target = e.target as HTMLSelectElement;
    if (target.value === "name") {
      SortByName({ $restaurantList, $restaurantItems });
    } else if (target.value === "distance") {
      SortByDistance({ $restaurantList, $restaurantItems });
    }
  });
}

export function SortByName({ $restaurantList, $restaurantItems }: SortProps) {
  const sortedItems: HTMLElement[] = $restaurantItems.sort((a, b) => {
    const aName =
      (a.querySelector(".restaurant__name") as HTMLElement)?.textContent ?? "";
    const bName =
      (b.querySelector(".restaurant__name") as HTMLElement)?.textContent ?? "";

    return aName.localeCompare(bName);
  });

  $restaurantList.innerHTML = "";
  sortedItems.forEach((item) => {
    $restaurantList.appendChild(item);
  });
}

function SortByDistance({ $restaurantList, $restaurantItems }: SortProps) {
  const sortedItems = [...$restaurantItems].sort((a, b) => {
    const aDistanceText =
      (a.querySelector(".restaurant__distance") as HTMLElement)?.textContent ??
      "";
    const bDistanceText =
      (b.querySelector(".restaurant__distance") as HTMLElement)?.textContent ??
      "";

    const aDistance = parseFloat(aDistanceText.replace(/[^0-9]/g, "")) || 0;
    const bDistance = parseFloat(bDistanceText.replace(/[^0-9]/g, "")) || 0;

    return aDistance - bDistance;
  });

  $restaurantList.innerHTML = "";
  sortedItems.forEach((item) => {
    $restaurantList.appendChild(item);
  });
}

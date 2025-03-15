export function SortByName($restaurantItems: HTMLElement[]) {
  return $restaurantItems.sort((a, b) => {
    const aName =
      (a.querySelector(".restaurant__name") as HTMLElement)?.textContent ?? "";
    const bName =
      (b.querySelector(".restaurant__name") as HTMLElement)?.textContent ?? "";

    return aName.localeCompare(bName);
  });
}

export function SortByDistance($restaurantItems: HTMLElement[]) {
  return $restaurantItems.sort((a, b) => {
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
}

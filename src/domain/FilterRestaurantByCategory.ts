export function FilterRestaurantByCategory(
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

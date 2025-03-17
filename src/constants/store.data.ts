import { RestaurantItem } from "../types/restaurant.types.ts";

export const storeData: RestaurantItem[] = [
  {
    id: 1,
    storeName: "한식당",
    distance: 5,
    category: "한식",
    description: "맛있는 한식당",
    link: "https://www.google.com",
    isFavorite: false,
  },
  {
    id: 2,
    storeName: "양식당",
    distance: 10,
    category: "양식",
    description: "파스타",
    link: "https://www.google.com",
    isFavorite: false,
  },
];

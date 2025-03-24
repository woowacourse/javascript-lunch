export interface RestaurantInfo {
  id: number | undefined;
  category: Category;
  name: string;
  distance: number;
  description?: string;
  link?: string;
  favorite?: boolean;
}

type Category = "korean" | "chinese" | "japanese" | "asian" | "western" | "etc";

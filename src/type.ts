type Category = "korean" | "chinese" | "japanese" | "western" | "asian" | "etc";
type Distance = 5 | 10 | 15 | 20 | 30;
export interface ILunchItem {
  id: string;
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
  isFavorite: boolean;
}

export type HTMLTagName = keyof HTMLElementTagNameMap;

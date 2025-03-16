type Category = "korean" | "chinese" | "japanese" | "western" | "asian" | "etc";
type Distance = 5 | 10 | 15 | 20 | 30;
export interface ILunchItem {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
  isFavorite: boolean;
  dataIndex?: number;
}

export type HTMLTagName = keyof HTMLElementTagNameMap;

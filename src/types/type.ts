export type HTMLTagName = keyof HTMLElementTagNameMap;

export type Props<T extends HTMLTagName> = Omit<
  Partial<HTMLElementTagNameMap[T]>,
  "className"
> & {
  className?: string | string[];
};

export type Category = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";

export type CategoryFilter = "전체" | Category;

export type SortedOption = "name" | "distance";

export type Distance = 5 | 10 | 15 | 20 | 30;

export interface Restaurant {
  id: string;
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
  isFavorite: boolean;
}

export interface OptionItem {
  value: string | number;
  text: string;
}

export type ReadOnlyOptionList = ReadonlyArray<Readonly<OptionItem>>;

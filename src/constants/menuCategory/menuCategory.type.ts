import { ObjectToUnion } from "../../types/common";
import { MENU_CATEGORIES } from "./menuCategory";

export type MenuCategory = ObjectToUnion<typeof MENU_CATEGORIES>;

export type MenuCategoryWithoutAll = Exclude<
  MenuCategory,
  typeof MENU_CATEGORIES.all
>;

export type MenuCategoryKey =
  | "all"
  | "korean"
  | "chinese"
  | "japanese"
  | "western"
  | "asian"
  | "others";

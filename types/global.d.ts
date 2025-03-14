import {
  CATEGORY_ICON,
  DISTANCE_DROPDOWN_LIST,
  SORT_DROPDOWN_LIST,
} from "../src/constants/constants";
import { CATEGORY_FILTER_DROPDOWN_LIST } from "../src/constants/dropdownList";

declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare module "*.css";

type Label = keyof typeof CATEGORY_ICON;
type Distance = (typeof DISTANCE_DROPDOWN_LIST)[number]["value"] & number;

interface Restaurant {
  id: number;
  label: Label;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
}

type CATEGORY_FILTER = (typeof CATEGORY_FILTER_DROPDOWN_LIST)[number]["value"];
type SORTING_FILTER = (typeof SORT_DROPDOWN_LIST)[number]["value"];

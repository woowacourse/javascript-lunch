import { ObjectToUnion } from "../../../types/common";
import { RESTAURANT_TAB_STATUS_TABLE } from "./RestaurantTab.constant";

export type RestaurantTabStatus = ObjectToUnion<
  typeof RESTAURANT_TAB_STATUS_TABLE
>;

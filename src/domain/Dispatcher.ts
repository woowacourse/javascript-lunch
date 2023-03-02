import { Action, Restaurant, Category, SortMethod } from "../abstracts/types";
import RestaurantInstance from "./RestaurantsStore";

const dispatcher = (
  type: string,
  data?: Restaurant | Category | SortMethod
) => {
  const action: Action = { type, data };
  RestaurantInstance.reducer[type](action);
};

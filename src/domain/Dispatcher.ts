import { Action, Restaurant, Category, SortMethod } from "../abstracts/types";
import ModalInstance from "./ModalStore";
import RestaurantInstance from "./RestaurantsStore";

const reducer = {
  ...RestaurantInstance.reducer,
  ...ModalInstance.reducer,
};

const dispatcher = (
  type: string,
  data?: Restaurant | Category | SortMethod | boolean
) => {
  const action: Action = { type, data };
  reducer[type](action);
};

export default dispatcher;

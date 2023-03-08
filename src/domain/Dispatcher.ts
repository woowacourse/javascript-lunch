import { Action, Restaurant, Category, SortMethod } from "../abstracts/types";
import ModalInstance from "./store/ModalStore";
import RestaurantInstance from "./store/RestaurantsStore";
import MenuInstance from "./store/MenuStore";

const reducer = {
  ...RestaurantInstance.reducer,
  ...ModalInstance.reducer,
  ...MenuInstance.reducer,
};

const dispatcher = (
  type: string,
  data?: Restaurant | Category | SortMethod | boolean
) => {
  const action: Action = { type, data };
  reducer[type](action);
};

export default dispatcher;

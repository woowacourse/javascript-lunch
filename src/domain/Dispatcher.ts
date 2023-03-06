import { Action, Restaurant, Category, SortMethod } from "../abstracts/types";
import StoreInstance from "./Store";

const dispatcher = (
  type: string,
  data?: Restaurant | Category | SortMethod
) => {
  const action: Action = { type, data };
  StoreInstance.reducer[type](action);
};

export default dispatcher;

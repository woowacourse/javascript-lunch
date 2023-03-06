import { Action, Restaurant, Category, SortMethod } from "../abstracts/types";
import StoreInstance from "./Store";

const reducer = {
  ...StoreInstance.reducer,
};

const dispatcher = (
  type: string,
  data?: Restaurant | Category | SortMethod
) => {
  const action: Action = { type, data };
  reducer[type](action);
};

export default dispatcher;

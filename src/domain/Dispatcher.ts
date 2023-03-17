import {
  Action,
  Restaurant,
  Category,
  SortMethod,
  Index,
} from "../abstracts/types";
import StoreInstance from "./Store";

const reducer = {
  ...StoreInstance.reducer,
};

const dispatcher = (
  type: string,
  data: Restaurant | Category | SortMethod | Index
) => {
  const action: Action = { type, data };
  reducer[type](action);
};

export default dispatcher;

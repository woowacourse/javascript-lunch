import { renderRestaurantList } from "../components/RestaurantList/handleRestaurantList";
import IListState from "../type/IListState";
import IRestaurant from "../type/IRestaurant";
import { TCategory } from "../type/TCategory";

const restaurants = {
  create(init: IListState) {
    const stateProxy = new Proxy(init, {
      set: (obj, prop, value) => {
        // type-guard
        if (prop === "restaurants" || prop === "filter" || prop === "sort") {
          obj[prop] = value;
        }
        renderRestaurantList();
        return true;
      },
    });

    return stateProxy;
  },
};

export { restaurants };

import { renderRestaurantList } from "../components/RestaurantList/handleRestaurantList";
import IRestaurant from "../type/IRestaurant";
import { TCategory } from "../type/TCategory";

const restaurants = {
  create(init: {
    restaurants: IRestaurant[];
    filter: TCategory;
    sort: string;
  }) {
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

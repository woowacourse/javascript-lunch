import { renderRestaurantList } from "../components/RestaurantList/handleRestaurantList";
import IRestaurant from "../type/IRestaurant";

const restaurants = {
  state: {
    restaurants: [] as IRestaurant[],
    filter: "all",
    sort: "name",
  },
  create() {
    this.state = new Proxy(
      {
        restaurants: [],
        filter: "all",
        sort: "name",
      },
      {
        set: (obj, prop, value) => {
          // type-guard
          if (prop === "restaurants" || prop === "filter" || prop === "sort") {
            obj[prop] = value;
          }
          renderRestaurantList();
          return true;
        },
      }
    );
  },
};

export { restaurants };

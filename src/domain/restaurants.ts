import { renderRestaurantList } from "../components/RestaurantList/handleRestaurantList";
import IRestaurant from "../type/IRestaurant";

const initState = {
  restaurants: [] as IRestaurant[],
  filter: "all",
  sort: "name",
  menuTab: "tab-all",
};

const restaurants = {
  state: initState,
  create() {
    this.state = new Proxy(initState, {
      set: (obj, prop, value) => {
        // type-guard (최적화 필요)
        if (
          prop === "restaurants" ||
          prop === "filter" ||
          prop === "sort" ||
          prop === "menuTab"
        ) {
          obj[prop] = value;
        }
        renderRestaurantList();
        return true;
      },
    });
  },
};

export { restaurants };

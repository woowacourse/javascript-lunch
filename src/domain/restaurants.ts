import { renderRestaurantList } from "../components/RestaurantList/handleRestaurantList";
import IListState from "../type/IListState";
import IRestaurant from "../type/IRestaurant";

const initState: IListState = {
  restaurants: [] as IRestaurant[],
  filter: "all",
  sort: "name",
  menuTab: "tab-all",
};

const restaurants = {
  state: initState,
  create() {
    this.state = new Proxy(initState, {
      set: (obj, prop: keyof IListState, value) => {
        if (prop in obj) {
          obj[prop] = value;
          renderRestaurantList();
          return true;
        }
        return false;
      },
    });
  },
};

export { restaurants };

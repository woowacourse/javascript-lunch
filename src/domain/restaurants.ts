import RestaurantList from "../components/RestaurantList";
import RestaurantType from "../type/Restaurant";

export const restaurants = {
  state: { restaurants: [] as RestaurantType[] },
  create() {
    this.state = new Proxy(
      { restaurants: [] as RestaurantType[] },
      {
        set: (obj, prop, value) => {
          if (prop === "restaurants") {
            obj[prop] = value;
          }
          const restaurantList = document.getElementById("restaurantList");
          if (restaurantList instanceof RestaurantList) {
            restaurantList.render();
          }
          return true;
        },
      }
    );
  },
};

import Persistence from "../domain/persistence/Persistence";
import { restaurants } from "../restaurantListData";

export const initPersistenceData = () => {
  if (Persistence.isEmpty()) {
    Persistence.init();
    Persistence.saveRestaurantList(restaurants);
  }
};

export default initPersistenceData;

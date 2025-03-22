import Persistence from "../domain/persistence/Persistence";
import RestaurantList from "../domain/RestaurantList";

export const createRestaurantList = () => {
  const data = Persistence.loadRestaurantList();
  const category = Persistence.loadCategory();
  const nameOrDistance = Persistence.loadNameOrDistance();

  const list = new RestaurantList(data);
  list.category = category;
  list.nameOrDistance = nameOrDistance;

  return list;
};

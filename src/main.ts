import { DOM } from './dom';
import { getRestaurantList } from './Domain/services/RestaurantService';
import Restaurant from './Domain/Restaurant';
import Header from './UI/components/header/Header';
import RestaurantItem from './UI/components/restaurant/RestaurantItem';
import AddRestaurantModal from './UI/pages/modal/components/AddRestaurantModal';

const addRestaurantModal = new AddRestaurantModal();
new Header(() => addRestaurantModal.handleToggleModal());

const createRestaurantList = (restaurantList: Restaurant[]) => {
  if (!DOM.RESTAURANT_LIST) return;

  restaurantList.forEach((restaurant: Restaurant) => {
    const restaurantItem = new RestaurantItem(restaurant).getElement();
    DOM.RESTAURANT_LIST!.appendChild(restaurantItem as unknown as Node);
  });
};

createRestaurantList(getRestaurantList());

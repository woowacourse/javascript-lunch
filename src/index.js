import './css/style.css';
import LunchHeader from './components/LunchHeader/LunchHeader.ts';
import RestaurantFilter from './components/RestaurantFilter/RestaurantFilter.ts';
import RestaurantList from './components/RestaurantList/RestaurantList.ts';
import Sorting from './enums/Sorting.ts';
import AddRestaurantModal from './components/AddRestaurantModal/AddRestaurantModal.ts';

const init = () => {
  LunchHeader.create();
  RestaurantFilter.create();
  AddRestaurantModal.create();
  // eslint-disable-next-line no-new
  new RestaurantList('전체', Sorting.이름순);
};

init();

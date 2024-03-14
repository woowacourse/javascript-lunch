import '../assets/css/main.css';

import '../components/AddStoreBtn';
import '../components/AllRestaurantList';
import '../components/CategoryIcon/style.css';
import '../components/CategoryIcon';
import '../components/CustomModal';
import '../components/CustomInput';
import '../components/CustomTextarea';
import '../components/DefaultBtn';
import '../components/DropBox';
import '../components/ErrorMessageBox';
import '../components/FavoriteIcon';
import '../components/FavoriteRestaurantList';
import '../components/FormTextField';
import '../components/FormInput';
import '../components/NavigationBar';
import '../components/NoneRestaurant';
import '../components/RestaurantDescription';
import '../components/RestaurantFormModalInner';
import '../components/RestaurantDistance';
import '../components/RestaurantName';
import '../components/RestaurantInfoModalInner';
import '../components/RestaurantItem';

import FilteringController from './FilteringController';
import RestaurantListContainerController from './RestaurantListContainerController';
import RestaurantListController from './RestaurantListController';

const WebController = {
  setup() {
    RestaurantListController.saveInitialDataToLocalStorage();
    RestaurantListContainerController.injectAllRestaurantList();

    FilteringController.addEventToFiltering();
  },
};

export default WebController;

import '../assets/css/main.css';

import '../components/AddStoreBtn';
import '../components/CategoryIcon/style.css';
import '../components/CategoryIcon';
import '../components/CustomModal';
import '../components/CustomInput';
import '../components/CustomTextarea';
import '../components/DefaultBtn';
import '../components/FavoriteIcon';
import '../components/FormTextField';
import '../components/FormInput';
import '../components/RestaurantFormModalInner';
import '../components/ErrorMessageBox';
import '../components/RestaurantItem';
import '../components/DropBox';

import { RestaurantList } from '../domains';

import FilteringController from './FilteringController';
import RestaurantListController from './RestaurantListController';

const WebController = {
  setup() {
    RestaurantListController.saveInitialDataToLocalStorage();
    RestaurantListController.injectRestaurantListHTML(
      new RestaurantList().list,
    );

    FilteringController.addEventToFiltering();
  },
};

export default WebController;

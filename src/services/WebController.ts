import '../assets/css/main.css';
import '../components/AddStoreBtn/index.ts';
import '../components/CategoryIcon/style.css';
import '../components/CategoryIcon/index.ts';
import '../components/DefaultBtn/index.ts';
import '../components/CustomModal/index.ts';
import '../components/CustomInput/index.ts';
import '../components/CustomTextarea/index.ts';
import '../components/FormTextField/index.ts';
import '../components/RestaurantFormModalInner/index.ts';
import '../components/ErrorMessageBox/index.ts';
import '../components/Restaurant/index.ts';
import '../components/DropBox/index.ts';
import { RestaurantList } from '../domains/index.ts';
import { RestaurantListController, FilteringController } from './index.ts';

const WebController = {
  setup() {
    RestaurantListController.updateLocalStorage();
    RestaurantListController.injectRestaurantListHTML(
      new RestaurantList().list,
    );
    FilteringController.addEventToFiltering();
  },
};

export default WebController;

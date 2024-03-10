import '../styles/main.css';
import '../components/CategoryIcon/style.css';
import '../components/CategoryIcon/index.ts';
import '../components/AddBtn/index.ts';
import '../components/DefaultBtn/index.ts';
import '../components/CustomInput/index.ts';
import '../components/CustomTextarea/index.ts';
import '../components/RestaurantFormModalInner/index.ts';
import '../components/CustomModal/index.ts';
import '../components/ErrorMessageBox/index.ts';
import '../components/Restaurant/index.ts';
import '../components/FormTextField/index.ts';
import '../components/DropBox/index.ts';
import { RestaurantList } from '../domains';
import {
  RestaurantListController,
  StoreAddBtnController,
  FilteringController,
} from '../services';

const WebController = {
  setup() {
    RestaurantListController.updateLocalStorage();
    RestaurantListController.injectRestaurantListHTML(
      new RestaurantList().list,
    );
    StoreAddBtnController.addEventToBtn();
    FilteringController.addEventToFiltering();
  },
};

export default WebController;

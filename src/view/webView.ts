import AddSelect from '../components/AddSelect';
import { Restaurant } from '../domain/model/RestaurantList';
import { $, $$$$ } from '../utils';

const webView = {
  resetForm: () => {
    $$$$('add-restaurant-modal', 'filter-box').forEach((element: AddSelect) =>
      element.reset()
    );
    $$$$('add-restaurant-modal', 'add-select').forEach((element: AddSelect) =>
      element.reset()
    );
  },
};

export default webView;

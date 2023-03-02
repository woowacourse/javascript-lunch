import "../templates/style.css";

import App from "./App";
import {
  setAddNewRestaurantHandler,
  setFilteringSelectChangeHandler,
  setModalToggleHandler,
  setSortingSelectChangeHandler,
} from "./EventHandler";

const app = new App();

setModalToggleHandler(app.openModal.bind(app), app.closeModal.bind(app));
setSortingSelectChangeHandler(app.onClickSortingOption.bind(app));
setFilteringSelectChangeHandler(app.onClickFilteringOption.bind(app));
setAddNewRestaurantHandler(app.onSubmitNewRestaurant.bind(app));

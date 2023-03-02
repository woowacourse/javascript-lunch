import "../templates/style.css";

import App from "./App";
import {
  setFilteringSelectChangeHandler,
  setModalToggleHandler,
  setSortingSelectChangeHandler,
} from "./EventHandler";

const app = new App();

setModalToggleHandler(app.openModal.bind(app), app.closeModal.bind(app));
setSortingSelectChangeHandler(app.sortRestaurantList.bind(app));
setFilteringSelectChangeHandler(app.filterRestaurantList.bind(app));

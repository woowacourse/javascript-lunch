import "../templates/style.css";

import App from "./App";
import {
  // setAddNewRestaurantHandler,
  setModalToggleHandler,
} from "./EventHandler";

const app = new App();

setModalToggleHandler(app.openModal.bind(app), app.closeModal.bind(app));
// setAddNewRestaurantHandler(app.onSubmitNewRestaurant.bind(app));

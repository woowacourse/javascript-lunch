import "../templates/style.css";

import LunchHeader from "./components/LunchHeader";
import Modal from "./components/Modal";
import App from "./App";
import RestaurantAddForm from "./components/RestaurantAddForm";

customElements.define("lunch-header", LunchHeader, { extends: "header" });
customElements.define("lunch-modal", Modal);
customElements.define("restaurant-add-form", RestaurantAddForm, {
  extends: "form",
});

new App();

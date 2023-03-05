import "../templates/style.css";

import LunchHeader from "./components/LunchHeader";
import CustomSelect from "./components/CustomSelect";
import Modal from "./components/Modal";
import App from "./App";
import RestaurantAddForm from "./components/RestaurantAddForm";

customElements.define("lunch-header", LunchHeader, { extends: "header" });
customElements.define("custom-select", CustomSelect, { extends: "select" });
customElements.define("lunch-modal", Modal);
customElements.define("restaurant-add-form", RestaurantAddForm, {
  extends: "form",
});

new App();

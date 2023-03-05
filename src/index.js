import "../templates/style.css";

import LunchHeader from "./components/LunchHeader";
import CustomSelect from "./components/CustomSelect";
import RestaurantCardList from "./components/RestaurantCardList";
import RestaurantCard from "./components/RestaurantCard";
import RestaurantAddForm from "./components/RestaurantAddForm";
import Modal from "./components/Modal";
import App from "./App";

customElements.define("lunch-header", LunchHeader, { extends: "header" });
customElements.define("custom-select", CustomSelect, { extends: "select" });
customElements.define("restaurant-card-list", RestaurantCardList, {
  extends: "ul",
});
customElements.define("restaurant-card", RestaurantCard, { extends: "li" });
customElements.define("lunch-modal", Modal);
customElements.define("restaurant-add-form", RestaurantAddForm, {
  extends: "form",
});

new App();

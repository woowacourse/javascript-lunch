import LunchHeader from "./LunchHeader";
import Modal from "./Modal";
import CustomSelect from "./CustomSelect";
import RestaurantCardList from "./RestaurantCardList";
import RestaurantCard from "./RestaurantCard";
import RestaurantAddForm from "./RestaurantAddForm";

customElements.define("lunch-header", LunchHeader, { extends: "header" });
customElements.define("lunch-modal", Modal);
customElements.define("custom-select", CustomSelect, { extends: "select" });
customElements.define("restaurant-card-list", RestaurantCardList, {
  extends: "ul",
});
customElements.define("restaurant-card", RestaurantCard, { extends: "li" });
customElements.define("restaurant-add-form", RestaurantAddForm, {
  extends: "form",
});

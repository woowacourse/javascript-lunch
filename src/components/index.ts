import LunchHeader from "./LunchHeader";
import ModalRoot from "./ModalRoot";
import RestaurantAddModal from "./RestaurantAddModal";
import CustomSelect from "./CustomSelect";
import RestaurantCardList from "./RestaurantCardList";
import RestaurantCard from "./RestaurantCard";
import RestaurantAddForm from "./RestaurantAddForm";

customElements.define("lunch-header", LunchHeader, { extends: "header" });
customElements.define("modal-root", ModalRoot);
customElements.define("restaurant-add-modal", RestaurantAddModal);
customElements.define("custom-select", CustomSelect, { extends: "select" });
customElements.define("restaurant-card-list", RestaurantCardList, {
  extends: "ul",
});
customElements.define("restaurant-card", RestaurantCard, { extends: "li" });
customElements.define("restaurant-add-form", RestaurantAddForm, {
  extends: "form",
});

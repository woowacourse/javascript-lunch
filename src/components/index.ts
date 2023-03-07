import LunchHeader from "./LunchHeader";
import RestaurantOptionSelect from "./RestaurantOptionSelect";
import RestaurantCardList from "./RestaurantCardList";
import RestaurantCard from "./RestaurantCard";

import ModalRoot from "./modal/ModalRoot";
import RestaurantAddModal from "./modal/RestaurantAddModal";

customElements.define("lunch-header", LunchHeader, { extends: "header" });
customElements.define("modal-root", ModalRoot);
customElements.define("restaurant-add-modal", RestaurantAddModal);
customElements.define("restaurant-option-select", RestaurantOptionSelect, {
  extends: "select",
});
customElements.define("restaurant-card-list", RestaurantCardList, {
  extends: "ul",
});
customElements.define("restaurant-card", RestaurantCard, { extends: "li" });

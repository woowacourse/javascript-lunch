import "./styles/common.css";
import "./styles/Header.css";
import "./styles/RestaurantList.css";
import "./styles/Filter.css";
import "./styles/Selects.css";
import "./styles/RestaurantModal.css";

import "../templates/add-button.png";
import "../templates/category-asian.png";
import "../templates/category-chinese.png";
import "../templates/category-etc.png";
import "../templates/category-japanese.png";
import "../templates/category-korean.png";
import "../templates/category-western.png";
import "../templates/favorite-icon-filled.png";
import "../templates/favorite-icon-lined.png";
import App from "./App";

const $app = document.querySelector<HTMLDivElement>("#app");
if ($app) {
  new App($app);
}

import App from "./components/App.js";
import { initializeRestaurantData } from "./data/storeRestaurantData.js";
initializeRestaurantData();
new App(document.getElementById("app"));

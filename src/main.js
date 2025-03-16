import App from "./components/App.js";
import { initializeRestaurantData } from "./domain/storeRestaurantData.js";
initializeRestaurantData();
new App(document.getElementById("app"));

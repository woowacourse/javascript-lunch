import App from "./components/App.js";
import { initializeRestaurantData } from "./domain/storeRestaurantData.ts";
initializeRestaurantData();
new App(document.getElementById("app"));

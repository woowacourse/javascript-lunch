import "../templates/style.css";

import LunchApp from "./LunchApp";
import { setRestaurantHeaderEvent } from "./event/setHeaderEvent";

customElements.define("lunch-app", LunchApp);

setRestaurantHeaderEvent();

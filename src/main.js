// import text from "./components/@common/text.js";
import restaurantList from "./views/restaurantList.js";

const app = document.querySelector("#app");

console.log("app", app);
app.append(restaurantList());

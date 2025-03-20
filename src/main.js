import renderMainPage from "./views/mainPage/mainPage.js";
import registerEventHandlers from "./eventHandler/registerEventHandlers.ts";

const initializeApp = () => {
  renderMainPage();
  registerEventHandlers();
};

initializeApp();

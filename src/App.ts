import "./styles/style.css";
import "../templates/add-button.png";
import "../templates/category-asian.png";
import "../templates/category-chinese.png";
import "../templates/category-etc.png";
import "../templates/category-japanese.png";
import "../templates/category-korean.png";
import "../templates/category-western.png";
import "../templates/favorite-icon-filled.png";
import "../templates/favorite-icon-lined.png";
import View from "./view";

class App {
  private restaurantView;

  constructor() {
    const $body = document.querySelector("body") as HTMLBodyElement;

    this.restaurantView = new View($body);
  }
}

export default App;

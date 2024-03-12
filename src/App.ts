import View from "./view";

class App {
  private restaurantView;

  constructor() {
    const $body = document.querySelector("body") as HTMLBodyElement;

    this.restaurantView = new View($body);
  }
}

export default App;

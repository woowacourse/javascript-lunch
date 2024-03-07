import View from "./view";

class App {
  private restaurantView;

  constructor() {
    this.restaurantView = new View();
  }

  init() {
    const $body = document.querySelector("body") as HTMLBodyElement;
    this.restaurantView.renderInit($body);

    this.restaurantView.renderSelectSection();
    this.restaurantView.renderListSection();
    this.restaurantView.renderFormModal();

    this.restaurantView.setEvents();
  }
}

export default App;

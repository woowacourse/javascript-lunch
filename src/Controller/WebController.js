import { RESTAURANT_CATEGORY } from '../domain/Restaurant';

class WebController {
  run() {
    this.#renderCategoryOptions();
  }

  #renderCategoryOptions() {
    const select = document.getElementById('category-select');
    select.addOptions(RESTAURANT_CATEGORY);
  }
}

export default WebController;

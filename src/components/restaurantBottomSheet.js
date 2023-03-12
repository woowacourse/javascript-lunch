import '../../css/restaurant-bottom-sheet.css';
import { $ } from '../utils/selector';

class restaurantBottomSheet {
  #state = {
    selector: '',
  };

  constructor(state) {
    this.#state = state;
  }

  render() {
    $(this.#state.selector).innerHTML = this.#template();
  }

  #template() {
    /* html */
    return `
			hello
		`;
  }
}

export default restaurantBottomSheet;

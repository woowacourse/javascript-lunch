import '../../css/nav.css';
import { $ } from '../utils/selector';

class Navigation {
  #state = {
    selector: '',
    class: '',
  };

  constructor(state) {
    this.#state = state;
  }

  render() {
    $(this.#state.selector).insertAdjacentHTML('beforeend', this.#template());
  }

  #template() {
    /* html */
    return `
			<div class=${this.#state.class}>
				<div class="text-button-container">
					<button class="selected-text nav-button text-button text-button--primary" aria-label="all-restaurants">모든 음식점</button>
					<button class="nav-button text-button text-button--secondary" aria-label="favorite-restaurants">자주 가는 음식점</button>
				</div>
				<div class="bar-button-container">
					<button class="selected-bar nav-button bar-button bar-button--primary" aria-label="all-restaurants"/>
					<button class="nav-button bar-button bar-button--secondary" aria-label="favorite-restaurants"/>
				</div>
			</div>
		`;
  }
}

export default Navigation;

import '../../css/header.css';
import '../assets/add-button.png';
import { $ } from '../utils/selector';

class Header {
  #state = {
    container: '',
  };

  constructor(state) {
    this.#state = state;
  }

  render() {
    $(this.#state.container).insertAdjacentHTML('beforeend', this.#template());
  }

  #template() {
    /* html */
    return `
			<h1 class="gnb__title text-title">점심 뭐 먹지</h1>
			<button type="button" class="gnb__button" aria-label="음식점 추가">
				<img src="./add-button.png" alt="음식점 추가" />
			</button>
		`;
  }
}

export default Header;

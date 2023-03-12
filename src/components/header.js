import '../../css/gnb.css';
import { $inBody } from '../utils/selector';
import '../assets/add-button.png';

class Header {
  #state = {
    selector: '',
    title: '',
  };

  constructor(state) {
    this.#state = state;
  }

  render() {
    $inBody(this.#state.selector).insertAdjacentHTML(
      'beforeend',
      this.#template()
    );
  }

  #template() {
    /* html */
    return `
			<h1 class="gnb__title text-title">${this.#state.title}</h1>
			<button type="button" class="gnb__button" aria-label="음식점 추가">
				<img src="./add-button.png" alt="음식점 추가" />
			</button>
		`;
  }
}

export default Header;

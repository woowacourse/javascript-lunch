import '../../css/header.css';
import '../assets/add-button.png';
import { $ } from '../utils/selector';

class Header {
  private state = {
    container: '',
  };

  constructor(state: { container: string }) {
    this.state = state;
  }

  render() {
    const headerContainer = $(this.state.container);

    if (headerContainer instanceof HTMLElement) {
      headerContainer.insertAdjacentHTML('beforeend', this.template());
    }
  }

  private template() {
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

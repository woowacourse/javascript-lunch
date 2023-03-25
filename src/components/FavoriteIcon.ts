import '../assets/favorite-icon-filled.png';
import '../assets/favorite-icon-lined.png';
import { $ } from '../utils/selector';

class FavoriteIcon {
  private state = {
    container: '',
  };

  constructor(state: { container: string }) {
    this.state = state;
  }

  render(number: number, favoriteOpenClass: string) {
    const favoriteIconContainer = $(this.state.container);

    if (favoriteIconContainer instanceof HTMLElement) {
      favoriteIconContainer.insertAdjacentHTML(
        'beforeend',
        this.template(number, favoriteOpenClass)
      );
    }
  }

  template(number: number, favoriteOpenClass: string): string {
    /* html */
    return `
			<img
				src="./favorite-icon-lined.png"
				alt="즐겨찾기"
				class="favorite-icon-lined favorite-icon-lined-${number}"
			/>
			<img
				src="./favorite-icon-filled.png"
				alt="즐겨찾기"
				class="favorite-icon-filled favorite-icon-filled-${number} ${favoriteOpenClass}"
			/>
		`;
  }
}

export default FavoriteIcon;

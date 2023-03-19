import '../assets/category-korean.png';
import '../assets/category-chinese.png';
import '../assets/category-japanese.png';
import '../assets/category-western.png';
import '../assets/category-asian.png';
import '../assets/category-etc.png';
import { CATEGORY_IMAGES } from '../constants/asset';
import { $ } from '../utils/selector';
import { RestaurantType } from '../type/types';

class RestaurantCategory {
  private state = {
    container: '',
  };

  constructor(state: { container: string }) {
    this.state = state;
  }

  render(category: RestaurantType['category']) {
    const categoryContainer = $(this.state.container);

    if (categoryContainer) {
      categoryContainer.insertAdjacentHTML('beforeend', this.template(category));
    }
  }

  template(category: RestaurantType['category']) {
    /* html */
    return `
			<img
				src="./category-${CATEGORY_IMAGES[category]}.png"
				alt="${category}"
				class="category-icon"
			/>
		`;
  }
}

export default RestaurantCategory;

import { KOREAN_CATEGORY } from '../../constant/cons.js';

function createRestaurantCategoryIcon(category) {
  const restaurantCategory = document.createElement('div');
  restaurantCategory.className = 'restaurant__category';

  const categoryImg = document.createElement('img');
  categoryImg.src = `./category-${KOREAN_CATEGORY[category]}.png`;
  categoryImg.alt = category;
  categoryImg.className = 'category-icon';

  restaurantCategory.append(categoryImg);

  return restaurantCategory;
}

export default createRestaurantCategoryIcon;

import { KOREAN_CATEGORY } from '../constant/select';

export function createCategoryImage(category) {
  const categoryDiv = document.createElement('div');
  categoryDiv.className = 'restaurant__category';

  const categoryImg = document.createElement('img');
  categoryImg.src = `./category-${KOREAN_CATEGORY[category]}.png`;
  categoryImg.alt = category;
  categoryImg.className = 'category-icon';

  categoryDiv.appendChild(categoryImg);

  return categoryDiv;
}

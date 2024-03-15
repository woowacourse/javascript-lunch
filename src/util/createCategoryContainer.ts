import { Asset } from '../asset/asset';
import { Category } from '../enum/enums';

export default function createCategoryContainer(category: Category) {
  const createCategoryContainer = document.createElement('div');
  createCategoryContainer.classList.add('restaurant__category');

  const categoryIcon = document.createElement('img');
  categoryIcon.classList.add('category-icon');
  categoryIcon.setAttribute('src', Asset.imageUrl[category]);
  categoryIcon.setAttribute('alt', category);
  createCategoryContainer.appendChild(categoryIcon);

  return createCategoryContainer;
}

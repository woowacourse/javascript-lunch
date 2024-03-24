import { CATEGORY } from '../constants';
import { CategoryValues } from '../types';

const CategoryIcon = (category: CategoryValues) => {
  const findCategoryKey = (categoryValue: CategoryValues) => {
    return Object.keys(CATEGORY).find(
      (key) => CATEGORY[key as keyof typeof CATEGORY] === categoryValue
    );
  };

  const createImageElement = (key: string | undefined, category: CategoryValues) => {
    const img = document.createElement('img');
    img.src = `../templates/category-${key}.png`;
    img.alt = `${category} 카테고리 아이콘`;
    return img;
  };

  const createCategoryIconDiv = (imgElement: HTMLImageElement) => {
    const div = document.createElement('div');
    div.classList.add('restaurant__category');
    div.appendChild(imgElement);
    return div;
  };

  const assembleCategoryIconComponent = (category: CategoryValues) => {
    const key = findCategoryKey(category);
    const imgElement = createImageElement(key, category);
    return createCategoryIconDiv(imgElement);
  };

  const categoryIconComponent = assembleCategoryIconComponent(category);

  const create = () => categoryIconComponent;

  return { create };
};

export default CategoryIcon;

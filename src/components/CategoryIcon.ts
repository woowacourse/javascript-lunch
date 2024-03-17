import { CATEGORY } from '../constants';
import { CategoryValues } from '../types/types';

const CategoryIcon = (category: CategoryValues) => {
  const key = Object.keys(CATEGORY).find(
    (key) => CATEGORY[key as keyof typeof CATEGORY] === category
  );

  const div = document.createElement('div');
  div.classList.add('restaurant__category');

  const img = document.createElement('img');
  img.src = `../templates/category-${key}.png`;
  img.alt = '${category} 카테고리 아이콘';

  div.appendChild(img);

  const create = () => div;

  return {
    create
  };
};

export default CategoryIcon;

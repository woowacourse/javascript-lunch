import { CATEGORY } from '../constants/constants';
import { CategoryValues } from '../types/types';

// export function CategoryIconComponent() {
//   const getTemplate = (category: CategoryValues) => {
//     const key = Object.keys(CATEGORY).find(
//       (key) => CATEGORY[key as keyof typeof CATEGORY] === category
//     );

//     return `
//           <button type="button" class="gnb__button" aria-label="음식점 추가">
//           <img src="../templates/category-${key}.png" alt="음식점 추가" />
//           </button>
//         `;
//   };

//   const handleClick = () => {};

//   return {
//     getTemplate,
//     handleClick
//   };
// }

const CategoryIconComponent = (category: CategoryValues) => {
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

export default CategoryIconComponent;

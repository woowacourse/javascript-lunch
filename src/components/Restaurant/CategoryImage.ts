import { CATEGORY_CONVERTER } from '../../constant/constants';
import { Category } from '../../interface/RestaurantInterfaces';

const CategoryImage = (category: Category) => {
  const img = document.createElement('img');
  img.classList.add('category-icon');
  img.src = `./category-${CATEGORY_CONVERTER[category]}.svg`;
  img.alt = category;

  return img;
};

export default CategoryImage;

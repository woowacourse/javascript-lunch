import style from './RestaurantCategoryIcon.module.css';
import { Category } from '@/types/Restaurant';
import CategoryIcon from './CategoryIcon';

class RestaurantCategoryIcon extends HTMLDivElement {
  constructor() {
    super();
    this.className = `restaurant__category ${style.restaurant__category}`;

    const category = this.getAttribute('category') as Category;
    this.append(new CategoryIcon(category));
  }
}

customElements.define('restaurant-category-icon', RestaurantCategoryIcon, { extends: 'div' });
export default RestaurantCategoryIcon;

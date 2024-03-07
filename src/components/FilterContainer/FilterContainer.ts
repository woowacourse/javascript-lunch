import { CATEGORIES, CONDITIONS } from '@/constants/Condition';
import BaseComponent from '../BaseComponent';
import SelectBox from '../SelectBox/SelectBox';

export const CATEGORY_KEYS = Object.keys(CATEGORIES);
export const SORT_CRITERION_KEYS = Object.keys(CONDITIONS.SORT_CRITERION);
class FilterContainer extends BaseComponent {
  render() {
    this.append(new SelectBox(CATEGORY_KEYS, 'category-filter'));
    this.append(new SelectBox(SORT_CRITERION_KEYS, 'sorting-filter'));
  }
}

customElements.define('filter-container', FilterContainer);

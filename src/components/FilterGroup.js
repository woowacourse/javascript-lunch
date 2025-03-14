import { CATEGORY_OPTIONS, SORT_OPTIONS } from '../../public/restaurantData.js';
import { CATEGORY } from '../constants/SETTING.js';
import { createSelectBox } from './common/SelectBox.js';

function createFilterGroup(onChangeCategory, onChangeFilter) {
  const fragment = new DocumentFragment();
  const categoryFilter = createSelectBox({
    options: [CATEGORY.ALL, ...CATEGORY_OPTIONS],
    type: 'category',
    onChange: onChangeCategory,
  });

  const sortFilter = createSelectBox({
    options: SORT_OPTIONS,
    type: 'sorting',
    onChange: onChangeFilter,
  });

  fragment.append(categoryFilter, sortFilter);
  return fragment;
}

export default createFilterGroup;

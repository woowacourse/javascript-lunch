import { CATEGORY, ORDER } from '../constants/SETTING.js';
import { createSelectBox } from './common/SelectBox.js';

function createFilterGroup(onChangeCategory, onChangeFilter) {
  const fragment = new DocumentFragment();
  const categoryFilter = createSelectBox({
    options: Object.values(CATEGORY),
    type: 'category',
    onChange: onChangeCategory,
  });

  const sortFilter = createSelectBox({
    options: Object.values(ORDER),
    type: 'sorting',
    onChange: onChangeFilter,
  });

  fragment.append(categoryFilter, sortFilter);
  return fragment;
}

export default createFilterGroup;

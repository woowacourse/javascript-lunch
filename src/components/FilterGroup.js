import { CATEGORY_OPTIONS, SORT_OPTIONS } from '../../public/restaurantData.js';
import { createSelectBox } from './common/SelectBox.js';

function createFilterGroup() {
  const fragment = new DocumentFragment();
  const categoryFilter = createSelectBox({
    options: CATEGORY_OPTIONS,
    onChange: (event) => {
      console.log(event.target.value);
    },
  });

  const sortFilter = createSelectBox({
    options: SORT_OPTIONS,
    onChange: (event) => {
      console.log(event.target.value);
    },
  });

  fragment.append(categoryFilter, sortFilter);
  return fragment;
}

export default createFilterGroup;

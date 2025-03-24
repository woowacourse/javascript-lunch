import { CATEGORY_OPTIONS } from '../../constant/selectOptions';
import createDOMElement from '../../util/createDomElement';

function CategoryFilter() {
  const CATEGORY_FILTER_OPTIONS = [
    { value: 'all', option: '전체' },
    ...CATEGORY_OPTIONS.filter((category) => category.value !== ''),
  ];

  return createDOMElement({
    tag: 'select',
    name: 'category',
    id: 'category-filter',
    class: 'restaurant-filter',
    children: CATEGORY_FILTER_OPTIONS.map((category) =>
      createDOMElement({
        tag: 'option',
        value: category.value,
        textContent: category.option,
      }),
    ),
  });
}

export default CategoryFilter;

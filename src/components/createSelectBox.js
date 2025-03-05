import createElement from '../utils/createElement.js';

function createSelectBox({ options, isRequired }) {
  const selectBoxDiv = createElement('div', `form-item ${isRequired && 'form-item--required'}`);
  const categoryLabel = createElement('label', null, '카테고리', { for: 'category text-caption' });
  const selectBox = createElement('select', null, null, {
    name: 'category',
    id: 'category',
    required: true,
  });

  const fragment = new DocumentFragment();
  options.forEach((option) => {
    const option = createElement('option', null, option, { value: option });
    fragment.appendChild(option);
  });

  selectBox.appendChild(fragment);
  itemDiv.appendChild(categoryLabel, selectBox);

  return selectBoxDiv;
}

export default createSelectBox;

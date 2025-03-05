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
  fragment.appendChild(createElement('option', null, '선택해 주세요', { value: '' }));

  options.forEach((option) => {
    const optionTag = createElement('option', null, option, { value: option });
    fragment.appendChild(optionTag);
  });

  selectBox.appendChild(fragment);
  selectBoxDiv.append(categoryLabel, selectBox);

  return selectBoxDiv;
}

export default createSelectBox;

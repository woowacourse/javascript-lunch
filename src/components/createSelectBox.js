import createElement from '../utils/createElement.js';

function createSelectBox({ options, isRequired, type }) {
  const selectBoxDiv = createElement('div', `form-item ${isRequired && 'form-item--required'}`);
  const categoryLabel = createElement(
    'label',
    null,
    type === 'category' ? '카테고리' : '거리(도보 이동 시간)',
    { for: `${type} text-caption` }
  );
  const selectBox = createElement('select', null, null, {
    name: type,
    id: type,
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

import createElement from '../utils/createElement.js';

function createSelectBox({ options, isRequired, type, onChange }) {
  const selectBoxDiv = createElement({
    tag: 'div',
    className: `form-item ${isRequired ? 'form-item--required' : ''}`,
  });
  const categoryLabel = createElement({
    tag: 'label',
    textContent: type === 'category' ? '카테고리' : '거리(도보 이동 시간)',
    attributes: { for: `${type} text-caption` },
  });
  const selectBox = createElement({
    tag: 'select',
    attributes: {
      name: type,
      id: type,
      required: isRequired,
    },
  });

  const fragment = new DocumentFragment();
  fragment.appendChild(
    createElement({ tag: 'option', textContent: '선택해 주세요', attributes: { value: '' } })
  );

  options.forEach((option) => {
    const optionTag = createElement({
      tag: 'option',
      textContent: type === 'category' ? option : `${option}분 내`,
      attributes: { value: option },
    });
    fragment.appendChild(optionTag);
  });

  selectBox.appendChild(fragment);
  selectBoxDiv.append(categoryLabel, selectBox);

  selectBox.addEventListener('change', (event) => {
    onChange(event);
  });

  return selectBoxDiv;
}

export default createSelectBox;

import createElement from '../../utils/createElement.js';

function createLabeldSelectBox({ options, label, isRequired, type, onChange }) {
  const selectBoxDiv = createElement({
    tag: 'div',
    className: `form-item${isRequired ? ' form-item--required' : ''}`,
  });
  const categoryLabel = createElement({
    tag: 'label',
    textContent: label,
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

function createSelectBox({ options, type, onChange }) {
  const selectBox = createElement({
    tag: 'select',
    attributes: {
      name: type,
      id: `${type}-filter`,
      class: 'restaurant-filter',
    },
  });

  const fragment = new DocumentFragment();

  options.forEach((option) => {
    const optionTag = createElement({
      tag: 'option',
      textContent: option,
      attributes: { value: option },
    });
    fragment.appendChild(optionTag);
  });

  selectBox.appendChild(fragment);

  selectBox.addEventListener('change', (event) => {
    onChange(event);
  });

  return selectBox;
}

export { createSelectBox, createLabeldSelectBox };

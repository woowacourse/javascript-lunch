import createElement from '../utils/createElement.js';

function createInputBox({ label, isRequired, type, helpText = '', onChange }) {
  const inputBoxDiv = createElement({
    tag: 'div',
    className: `form-item ${isRequired ? 'form-item--required' : ''}`,
  });
  const inputLabel = createElement({
    tag: 'label',
    textContent: label,
    attributes: { for: `${type} text-caption` },
  });
  const input = createElement({
    tag: 'input',
    attributes: {
      type: 'text',
      name: type,
      id: type,
      required: isRequired,
    },
  });

  const helpTextSpan = createElement({
    tag: 'span',
    className: 'help-text text-caption',
    textContent: helpText,
  });

  inputBoxDiv.append(inputLabel, input);

  if (helpText !== '') {
    inputBoxDiv.appendChild(helpTextSpan);
  }

  input.addEventListener('change', (event) => {
    onChange(event);
  });

  return inputBoxDiv;
}

export default createInputBox;

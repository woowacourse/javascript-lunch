import createElement from '../utils/createElement.js';

function createInputBox({ label, isRequired, type, helpText = '', onChange }) {
  const inputBoxDiv = createElement('div', `form-item ${isRequired && 'form-item--required'}`);
  const inputLabel = createElement('label', null, label, { for: `${type} text-caption` });
  const input = createElement('input', null, null, {
    type: 'text',
    name: type,
    id: type,
    required: isRequired,
  });

  const helpTextSpan = createElement('span', 'help-text text-caption', helpText);

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

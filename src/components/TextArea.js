import createElement from '../utils/createElement.js';

function createTextArea({ label, type, helpText = '', onChange }) {
  const textAreaDiv = createElement('div', 'form-item');
  const textLabel = createElement('label', null, label, { for: `${type} text-caption` });
  const textArea = createElement('textarea', null, null, {
    name: type,
    id: type,
    cols: '30',
    rows: '5',
  });

  textArea.addEventListener('change', (event) => {
    onChange(event);
  });

  const helpTextSpan = createElement('span', 'help-text text-caption', helpText);

  textAreaDiv.append(textLabel, textArea);

  if (helpText !== '') {
    textAreaDiv.appendChild(helpTextSpan);
  }

  return textAreaDiv;
}

export default createTextArea;

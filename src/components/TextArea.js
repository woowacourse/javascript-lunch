import createElement from '../utils/createElement.js';

function createTextArea({ label, type, helpText = '', onChange }) {
  const textAreaDiv = createElement({ tag: 'div', className: 'form-item' });
  const textLabel = createElement({
    tag: 'label',
    textContent: label,
    attributes: { for: `${type} text-caption` },
  });
  const textArea = createElement({
    tag: 'textarea',
    attributes: {
      name: type,
      id: type,
      cols: '30',
      rows: '5',
    },
  });

  textArea.addEventListener('change', (event) => {
    onChange(event);
  });

  const helpTextSpan = createElement({
    tag: 'span',
    className: 'help-text text-caption',
    textContent: helpText,
  });

  textAreaDiv.append(textLabel, textArea);

  if (helpText !== '') {
    textAreaDiv.appendChild(helpTextSpan);
  }

  return textAreaDiv;
}

export default createTextArea;

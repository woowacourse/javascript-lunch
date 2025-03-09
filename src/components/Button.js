import createElement from '../utils/createElement.js';

function createButton({ className, textContent, buttonType, onClick }) {
  const button = createElement({
    tag: 'button',
    type: 'button',
    className: `${className} button text-caption`,
    textContent: textContent,
    attributes: !buttonType ? {} : { type: buttonType },
  });

  button.addEventListener('click', (event) => {
    onClick(event);
  });

  return button;
}

export default createButton;

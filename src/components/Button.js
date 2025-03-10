import createElement from '../utils/createElement.js';

function createButton({ className, textContent, buttonType, onClick }) {
  const button = createElement(
    'button',
    `${className} button text-caption`,
    textContent,
    !buttonType ? {} : { type: buttonType }
  );

  button.addEventListener('click', (event) => {
    onClick(event);
  });

  return button;
}

export default createButton;

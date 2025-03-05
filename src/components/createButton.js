import createElement from '../utils/createElement.js';

function createButton({ type, textContent, buttonType }) {
  return createElement(
    'button',
    `${buttonType} button text-caption`,
    textContent,
    !buttonType ? {} : { type: buttonType }
  );
}

export default createButton;

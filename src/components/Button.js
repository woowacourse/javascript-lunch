import createElement from '../utils/createElement.js';

function createButton({ className, textContent, buttonType }) {
  return createElement(
    'button',
    `${className} button text-caption`,
    textContent,
    !buttonType ? {} : { type: buttonType }
  );
}

export default createButton;

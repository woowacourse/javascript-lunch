import { $ } from '../utils/domSelectors';

function addHeaderEvent(handleButtonClick: CallableFunction) {
  const addButton = $<HTMLButtonElement>('.gnb__button');

  addButton.addEventListener('click', () => {
    handleButtonClick();
  });
}

export { addHeaderEvent };

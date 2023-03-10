import { $ } from '../utils/domSelectors';

function addHeaderEvent(onButtonClick: CallableFunction) {
  const addButton = $<HTMLButtonElement>('.gnb__button');

  addButton.addEventListener('click', () => {
    onButtonClick();
  });
}

export { addHeaderEvent };

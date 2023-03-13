import { CLASS } from '../../constants';
import { Button } from '../../data/images';
import Modal from '../Modal';

const HeaderButton = {
  template() {
    return `
      <button type="button" class="${CLASS.GNB_BUTTON}" aria-label="음식점 추가">
        <img src=${Button.add} alt="음식점 추가">
      </button>`;
  },
  setEvent() {
    const gnbButton = document.querySelector(`.${CLASS.GNB_BUTTON}`);
    gnbButton?.addEventListener('click', () => Modal.openModal());
  },
};

export default HeaderButton;

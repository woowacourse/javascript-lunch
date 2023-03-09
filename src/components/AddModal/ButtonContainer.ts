import AddModal from '.';
import { ID } from '../../constants';

const ButtonContainer = {
  template() {
    return `
      <div class="button-container">
        <button type="button" id="${ID.CANCEL_BUTTON}" class="button button--secondary text-caption">취소하기</button>
        <button class="button button--primary text-caption">추가하기</button>
      </div>`;
  },
  setEvent() {
    const cancelButton = document.querySelector(`#${ID.CANCEL_BUTTON}`);

    cancelButton?.addEventListener('click', (e) => {
      e.preventDefault();
      AddModal.formReset();
      AddModal.closeModal();
    });
  },
};

export default ButtonContainer;

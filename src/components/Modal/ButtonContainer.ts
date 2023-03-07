import Modal from '.';

const ButtonContainer = {
  template() {
    return `
      <div class="button-container">
        <button type="button" class="button button--secondary text-caption">취소하기</button>
        <button class="button button--primary text-caption">추가하기</button>
      </div>`;
  },
  setEvent() {
    const cancelButton = document.querySelector('.button--secondary');

    cancelButton?.addEventListener('click', (e) => {
      e.preventDefault();
      Modal.closeModal();
    });
  },
};

export default ButtonContainer;

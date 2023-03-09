import RestaurantaddButtonImg from '../../templates/add-button.png';

const ModalButton = {
  template() {
    return `
    <button type="button" class="gnb__button" aria-label="음식점 추가">
    <img src=${RestaurantaddButtonImg} alt="음식점 추가">
    </button>`;
  },

  setEvent() {
    const gnbButton = document.querySelector('.gnb__button');

    gnbButton?.addEventListener('click', () => {
      const modal = document.querySelector('.modal') as HTMLElement;
      modal.className = 'modal--open';
    });
  },
};

export default ModalButton;

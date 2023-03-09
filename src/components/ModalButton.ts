import RestaurantaddButtonImg from '../../templates/add-button.png';

const ModalButton = {
  template() {
    return `
    <button type="button" class="gnb__button" aria-label="음식점 추가">
    <img src=${RestaurantaddButtonImg} alt="음식점 추가">
    </button>`;
  },

  setEvent() {
    document.querySelector('.gnb__button').addEventListener('click', () => {
      // 이벤트 추가
    });
  },
};

export default ModalButton;

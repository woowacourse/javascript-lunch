import RestaurantaddButtonImg from '../../templates/add-button.png';

const ModalButton = {
  print() {
    const tamplate = `
<button type="button" class="gnb__button" aria-label="음식점 추가">
  <img src=${RestaurantaddButtonImg} alt="음식점 추가">
</button>`;

    return tamplate;
  },
  setEvent() {
    document.querySelector('.gnb__button').addEventListener('click', () => {
      // TODO: 이벤트 추가
    });
  },
};

export default ModalButton;

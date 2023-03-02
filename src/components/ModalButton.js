import addButton from "../../templates/add-button.png";

const ModalButton = {
  show() {
    const tamplate = `
<button type="button" class="gnb__button" aria-label="음식점 추가">
  <img src=${addButton} alt="음식점 추가">
</button>`;

    return tamplate;
  },
  setEvent() {
    document.querySelector(".gnb__button").addEventListener("click", () => {
      // 이벤트 추가 필요
    });
  },
};

export default ModalButton;

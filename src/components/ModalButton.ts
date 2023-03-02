import addButton from "../../templates/add-button.png";

const ModalButton = {
  template() {
    return `
<button type="button" class="gnb__button" aria-label="음식점 추가">
  <img src=${addButton} alt="음식점 추가">
</button>`;
  },
  setEvent() {
    const gnbButton = document.querySelector(".gnb__button");
    gnbButton?.addEventListener("click", () => {
      // 이벤트 추가 필요
    });
  },
};

export default ModalButton;

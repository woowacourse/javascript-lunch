export const setModalToggleHandler = (
  openModal: () => void,
  closeModal: () => void
) => {
  const $modalOpenButton = document.querySelector(".gnb__button");
  const $modalCloseButton = document.querySelector(".button--secondary");

  $modalOpenButton?.addEventListener("click", () => {
    openModal();
  });

  $modalCloseButton?.addEventListener("click", () => {
    closeModal();
  });
};

export const setModalToggleHandler = (
  openModal: () => void,
  closeModal: () => void
) => {
  const $modalOpenButton = document.querySelector(".gnb__button");
  const $modalBackdrop = document.querySelector(".modal-backdrop");
  const $modalCloseButton = document.querySelector(".button--secondary");

  $modalOpenButton?.addEventListener("click", openModal);

  $modalBackdrop?.addEventListener("click", closeModal);
  $modalCloseButton?.addEventListener("click", closeModal);

  window.addEventListener("keydown", (event) => {
    if (event.code === "Escape") closeModal();
  });
};

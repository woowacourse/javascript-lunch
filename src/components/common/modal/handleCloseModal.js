export const registerModalClose = () => {
  $(".modal-backdrop").classList.remove("open");
  clearInput("#register-form");
};

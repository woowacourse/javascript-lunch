export const hideErrorMessage = () => {
  document.querySelectorAll('.error').forEach((el) => {
    el.classList.add('hidden');
  });
};

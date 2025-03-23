export const clearError = (selector = ".error-message") => {
  document.querySelectorAll(selector)?.forEach((el) => el.remove());
};

const querySelector = {
  $(target: string) {
    return document.querySelector(target);
  },

  $$(target: string) {
    return document.querySelectorAll(target);
  },
};

export default querySelector;

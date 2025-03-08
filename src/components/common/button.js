const $button = (BUTTON_INFO) => {
  const button = document.createElement("button");
  button.innerText = BUTTON_INFO.text;
  button.type = BUTTON_INFO.type;
  button.classList.add(...BUTTON_INFO.className);

  if (BUTTON_INFO.event) {
    button.addEventListener("click", BUTTON_INFO.event);
  }

  return button;
};

export default $button;

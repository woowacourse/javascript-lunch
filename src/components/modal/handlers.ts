export const dimmerClickHandler = (modal: Element) => {
  const dimmer = document.getElementsByClassName("modal-backdrop")[0];

  dimmer.addEventListener("click", () => {
    console.log("dimmer");
    modal.classList.remove("modal--open");
  });
};

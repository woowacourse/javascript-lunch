const dimmerClickHandler = (modal: Element) => {
  const dimmer = document.getElementsByClassName('modal-backdrop')[0];

  dimmer.addEventListener('click', () => {
    modal.classList.remove('modal--open');
  });
};
export default dimmerClickHandler;

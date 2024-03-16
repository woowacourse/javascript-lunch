const dimmerClickHandler = () => {
  const dimmer = document.getElementsByClassName('modal-backdrop')[0];
  const modal = document.getElementsByClassName('modal')[0];
  const modalContainer = document.getElementsByClassName('modal-container')[0];

  dimmer.addEventListener('click', () => {
    modalContainer.innerHTML = '';
    modal.classList.remove('modal--open');
  });
};
export default dimmerClickHandler;

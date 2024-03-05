const Modal = () => {
  const modal = document.querySelector('.modal');
  const handleCloseModal = (e) => {
    e.preventDefault();
    modal.classList.remove('modal--open');
  };

  const cancelBtn = modal.querySelector("button[type='reset']");
  cancelBtn.addEventListener('click', handleCloseModal);

  const addBtn = modal.querySelector("button[type='submit']");
  addBtn.addEventListener('click', handleCloseModal);
};

export default Modal;

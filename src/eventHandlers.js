function openModal() {
  const gnbButton = document.querySelector('.gnb__button');

  gnbButton.addEventListener('click', () => {
    const modal = document.querySelector('.modal');

    modal.classList.add('modal--open');
  });
}

export default openModal;

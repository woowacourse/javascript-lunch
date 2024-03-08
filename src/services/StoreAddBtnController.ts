const StoreAddBtnController = {
  addEventToBtn() {
    const addBtnEl = document.querySelector(
      '.top-bar add-btn',
    ) as HTMLButtonElement | null;

    addBtnEl?.addEventListener('click', () => {
      const modalEl = document
        .querySelector('custom-modal')
        ?.shadowRoot?.querySelector('.modal');

      modalEl?.classList.add('open');
    });
  },
};

export default StoreAddBtnController;
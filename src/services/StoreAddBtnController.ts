const StoreAddBtnController = {
  addEventToBtn() {
    const addBtnEl = document.querySelector(
      '.top-bar add-btn',
    ) as HTMLButtonElement | null;

    addBtnEl?.addEventListener('click', () => {
      const modalEl = document
        .querySelector('custom-modal')
        ?.shadowRoot?.querySelector('.modal');

      const formModalInner = /*html*/ `
      <restaurant-form-inner></restaurant-form-inner>
`;

      document
        .querySelector('[slot="child"]')
        ?.insertAdjacentHTML('afterbegin', formModalInner);

      modalEl?.classList.add('open');

      const bodyEl = document.querySelector('body');
      if (bodyEl) bodyEl.style.overflowY = 'hidden';
    });
  },
};

export default StoreAddBtnController;

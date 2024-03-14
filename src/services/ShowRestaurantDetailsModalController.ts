import findParentBox from '../utils/findParentBox';

const ShowRestaurantDetailsModalController = {
  showDetailInfo() {
    document.addEventListener('click', (event: MouseEvent) => {
      const clickedEl = event.target as HTMLElement;
      const clickedRestaurantEl = findParentBox(clickedEl, 'RESTAURANT-BOX');

      if (
        clickedRestaurantEl &&
        clickedEl.getAttribute('class') !== 'star-btn__img'
      ) {
        this.showModal(clickedRestaurantEl);
      }
    });
  },

  showModal(restaurantEl: HTMLElement) {
    const restaurantName = restaurantEl.getAttribute('name');

    const modalEl = document
      .querySelector('custom-modal')
      ?.shadowRoot?.querySelector('.modal');

    if (modalEl) {
      const detailsInfoModalInner = /*html*/ `
        <restaurant-info-modal-inner name="${restaurantName}"></restaurant-info-modal-inner>
      `;

      const slotChildEl = document.querySelector('[slot="child"]');

      const existingModalInner = slotChildEl?.getElementsByTagName(
        'restaurant-info-modal-inner',
      );
      const childEl = document.querySelector('restaurant-info-modal-inner');
      if (existingModalInner && childEl !== null) {
        slotChildEl?.removeChild(childEl);
      }

      slotChildEl?.insertAdjacentHTML('afterbegin', detailsInfoModalInner);

      modalEl.classList.add('open');

      const bodyEl = document.querySelector('body');
      if (bodyEl) bodyEl.style.overflowY = 'hidden';
    }
  },
};

export default ShowRestaurantDetailsModalController;

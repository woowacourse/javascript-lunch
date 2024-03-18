export default function closeModal() {
  const modalEl = document
    .querySelector('custom-modal')
    ?.shadowRoot?.querySelector('.modal');
  if (modalEl) {
    modalEl.classList.toggle('open');
  }

  const childSlotEl = document.querySelector('[slot="child"]');
  if (childSlotEl) {
    childSlotEl.innerHTML = '';
  }

  const bodyEl = document.querySelector('body');
  if (bodyEl) {
    bodyEl.style.overflowY = 'scroll';
  }
}

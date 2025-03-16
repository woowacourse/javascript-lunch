function createModal({ classNames }: { classNames: string[] }) {
  const modal = `<div class="modal ${classNames.join(' ')}">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
      </div>
    </div>`;

  return modal;
}

export default createModal;

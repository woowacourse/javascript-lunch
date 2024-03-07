function createModal() {
  const backdrop =     
}

function createBackdrop () {
  const backdrop = document.createElement('div');
  backdrop.className = "modal-backdrop";

  return backdrop;
}

export function createModalContainer() {
  const container = document.createElement('div');
  container.className = "modal-container";

  return container;
}
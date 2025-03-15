export default function handleFormModalToggle(
  event: MouseEvent,
  modal: HTMLDialogElement
) {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  if (target.closest(".restaurant-add-button")) {
    modal.show();
  }

  if (target.closest(".modal-backdrop")) {
    modal.close();
  }
}

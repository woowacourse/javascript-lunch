import InputSuccessModal from "../ConfirmDeleteModal";

const addDeleteEvent = (modal: InputSuccessModal, event: CustomEvent) => {
  (modal.element.querySelector(".button--secondary") as HTMLButtonElement)
    .addEventListener("click", () => {
      modal.element.dispatchEvent(new CustomEvent(
        "deleteRestaurantConfirmed",
        { bubbles: true, detail: event.detail },
      ));

      modal.close();
    });
};

export default addDeleteEvent;

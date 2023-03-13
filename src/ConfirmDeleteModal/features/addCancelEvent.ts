import InputSuccessModal from "../ConfirmDeleteModal";

const addCancelEvent = (modal: InputSuccessModal) => {
  (modal.element.querySelector(".button--primary") as HTMLButtonElement)
    .addEventListener("click", () => {
      modal.close();
    });
};

export default addCancelEvent;

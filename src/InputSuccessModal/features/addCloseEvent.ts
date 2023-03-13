import InputSuccessModal from "../InputSuccessModal";

const addCloseEvent = (modal: InputSuccessModal) => {
  (modal.element.querySelector(".button--secondary") as HTMLButtonElement)
    .addEventListener("click", () => modal.close());
};

export default addCloseEvent;

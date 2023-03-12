import Modal from "../Modal";

const addCloseModalCallback = (modal: Modal) => {
  const backdrop = modal.element.querySelector(".modal-backdrop");
  backdrop?.addEventListener("click", () => modal.close());
  document.addEventListener("keyup", (event) => {
    if (event.key === "Escape" && modal.element.classList.contains("modal--open")) {
      modal.close();
    }
  });
};

export default addCloseModalCallback;

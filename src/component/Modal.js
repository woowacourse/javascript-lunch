const Modal = {
  create(id) {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("class", "modal");
    if (id) modalRoot.setAttribute("id", id);

    Modal.addBackdrop(modalRoot);
    Modal.addContainer(modalRoot);

    return modalRoot;
  },

  open(element) {
    if (!element.classList.contains("modal--open")) {
      element.classList.add("modal--open");
    }
  },

  close(element) {
    if (element.classList.contains("modal--open")) {
      element.classList.remove("modal--open");
    }
  },

  setInnerHTML(element, string) {
    element.querySelector(".modal-container").innerHTML = string;
  },

  setChildElement(element, child) {
    element.querySelector(".modal-container").appendChild(child);
  },

  addBackdrop(modalRoot) {
    const backdrop = document.createElement("div");
    backdrop.setAttribute("class", "modal-backdrop");

    backdrop.addEventListener("click", () => Modal.close(modalRoot));
    document.addEventListener("keyup", (event) => {
      if (event.key === "Escape" && modalRoot.classList.contains("modal--open")) {
        Modal.close(modalRoot);
      }
    });

    modalRoot.appendChild(backdrop);
  },

  addContainer(modalRoot) {
    const container = document.createElement("div");
    container.setAttribute("class", "modal-container");

    modalRoot.appendChild(container);
  },
};

export default Modal;

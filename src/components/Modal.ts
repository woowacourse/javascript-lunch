type ModalProps = {
  el?: HTMLElement;
  id: string;
  title?: string;
  content: string;
  options?: {
    close: {
      label: string;
      onClick: () => void;
    };
    submit: {
      label: string;
      onClick: () => void;
    };
  };
};

const Modal = ({ id, title, content, options }: ModalProps) => {
  const modal = document.createElement("dialog");
  modal.classList.add("modal");
  modal.id = id;

  const handleClickClose = () => {
    options?.close.onClick();
    cleanUp();
    modal.close();
  };

  const handleSubmitClick = () => {
    submitButton?.addEventListener("click", () => {
      options?.submit.onClick();
      cleanUp();
      modal.close();
    });
  };

  const handleClickBackDrop = (event: MouseEvent) => {
    const target = event.target as Element;
    if (!target.closest(".modal-container")) {
      modal.close();
      cleanUp();
      options?.close.onClick();
    }
  };

  const cleanUp = () => {
    closeButton?.removeEventListener("click", handleClickClose);
    submitButton?.removeEventListener("click", handleSubmitClick);
    modal.removeEventListener("click", handleClickBackDrop);
  };

  modal.innerHTML = `
      <div class="modal-container">
        ${title ? `<h2 class="modal-title text-title">${title}</h2>` : ""}
        <div class="modal-content">
          ${content}
        </div>
        ${
          options
            ? `<div class="modal-footer">
          <div class="button-container">
            <button type="button" id="modal-close-btn" class="button button--secondary text-caption">${options.close.label}</button>
            <button type="button" id="modal-submit-btn" class="button button--primary text-caption">${options.submit.label}</button>
          </div>
        </div>`
            : ""
        }
      </div>
    `;

  const closeButton = modal.querySelector("#modal-close-btn");
  const submitButton = modal.querySelector("#modal-submit-btn");

  closeButton?.addEventListener("click", handleClickClose);
  submitButton?.addEventListener("click", handleSubmitClick);
  modal.addEventListener("click", handleClickBackDrop);

  return modal;
};

export default Modal;

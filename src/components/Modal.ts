type ModalProps = {
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

const createModal = ({ id, title, content, options }: ModalProps) => {
  const modal = document.createElement("dialog");
  modal.classList.add("modal");
  modal.id = id;

  const modalHTML = `
    <div class="modal-container">
      ${title ? `<h2 class="modal-title text-title">${title}</h2>` : ""}
      <div class="modal-content">
        ${content}
      </div>
      ${
        options
          ? `<div class="modal-footer">
        <div class="button-container">
          <button type="button" id="modal-close-btn" class="button button--secondary text-caption">${options?.close.label}</button>
          <button type="button" id="modal-submit-btn" class="button button--primary text-caption">${options?.submit.label}</button>
        </div>
      </div>`
          : ""
      }
    </div>
  `;

  modal.innerHTML = modalHTML;

  document.querySelector("body")?.append(modal);

  const closeButton = modal.querySelector("#modal-close-btn");
  const submitButton = modal.querySelector("#modal-submit-btn");

  closeButton?.addEventListener("click", () => {
    options?.close.onClick();
    modal.close();
    console.log("modal close");
  });

  submitButton?.addEventListener("click", () => {
    options?.submit.onClick();
    modal.close();
    console.log("modal close");
  });

  modal.addEventListener("click", (event) => {
    const target = event.target as Element;
    if (!target.closest(".modal-container")) {
      modal.close();
      options?.close.onClick();
    }
  });

  return modal;
};

export { createModal };

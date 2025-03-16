import { createForm } from "./Form.ts";
import { createButton } from "./Button.ts";

type ModalProps = {
  title?: string;
  isForm?: boolean;
  onSubmit?: (args: {
    form: HTMLFormElement;
    modal: HTMLDialogElement;
  }) => void;
  content?: string | HTMLElement;
  onClose?: () => void;
};

const createModal = ({
  title,
  isForm,
  onSubmit,
  content,
  onClose,
}: ModalProps) => {
  const modal = document.createElement("dialog");
  modal.classList.add("modal");

  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");

  if (title) {
    const modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title", "text-title");
    modalTitle.textContent = title;
    modalContainer.appendChild(modalTitle);
  }

  if (isForm) {
    modal.id = "add-restaurant-dialog";

    const form = createForm();
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      onSubmit?.({ form, modal });
    });

    modalContainer.appendChild(form);

    const cancelButton = form.querySelector("#cancel-dialog-btn");
    cancelButton?.addEventListener("click", () => {
      form.reset();
      modal.close();
    });
  }

  if (!isForm) {
    if (typeof content === "string") {
      const div = document.createElement("div");
      div.innerHTML = content;
      modalContainer.appendChild(div);
    } else if (content instanceof HTMLElement) {
      modalContainer.appendChild(content);
    }

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const deleteButton = createButton({
      type: "button",
      id: "cancel-dialog-btn",
      className: "button button--secondary text-caption",
      text: "삭제하기",
      onClick: () => {
        console.log("delete");
        modal.close();
      },
    });

    const closeButton = createButton({
      type: "button",
      id: "add-restaurant-btn",
      className: "button button--primary text-caption",
      text: "닫기",
      onClick: () => {
        console.log("close");
        modal.close();
      },
    });

    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(closeButton);
    modalContainer.appendChild(buttonContainer);
  }

  modal.appendChild(modalContainer);

  modal.addEventListener("click", (event) => {
    const target = event.target as Element;
    if (!target.closest(".modal-container")) {
      modal.close();
      onClose?.();
    }
  });

  return modal;
};

export { createModal };

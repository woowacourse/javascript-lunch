import { createButton } from "./Button.ts";

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

  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");

  if (title) {
    const modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title", "text-title");
    modalTitle.textContent = title;
    modalContainer.appendChild(modalTitle);
  }

  modal.id = id;
  modalContainer.innerHTML = content;

  // if (!isForm) {
  //   if (typeof content === "string") {
  //     const div = document.createElement("div");
  //     div.innerHTML = content;
  //     modalContainer.appendChild(div);
  //   } else if (content instanceof HTMLElement) {
  //     modalContainer.appendChild(content);
  //   }
  //
  //   const buttonContainer = document.createElement("div");
  //   buttonContainer.classList.add("button-container");
  //
  //   const deleteButton = createButton({
  //     type: "button",
  //     id: "cancel-dialog-btn",
  //     className: "button button--secondary text-caption",
  //     text: "삭제하기",
  //     onClick: () => {
  //       console.log("delete");
  //       modal.close();
  //     },
  //   });
  //
  //   const closeButton = createButton({
  //     type: "button",
  //     id: "add-restaurant-btn",
  //     className: "button button--primary text-caption",
  //     text: "닫기",
  //     onClick: () => {
  //       console.log("close");
  //       modal.close();
  //     },
  //   });
  //
  //   buttonContainer.appendChild(deleteButton);
  //   buttonContainer.appendChild(closeButton);
  //   modalContainer.appendChild(buttonContainer);
  // }

  modal.appendChild(modalContainer);

  if (options) {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const handleClickCloseButton = () => {
      options?.close.onClick();
      modal.close();
      console.log("modal close");
    };

    const handleSubmitButtonClick = () => {
      options?.submit.onClick();
      modal.close();
      console.log("modal close");
    };

    const closeButton = createButton({
      type: "button",
      id: "cancel-dialog-btn",
      className: "button button--secondary text-caption",
      text: options.close.label,
      onClick: handleClickCloseButton,
    });

    const submitButton = createButton({
      type: "button",
      id: "add-restaurant-btn",
      className: "button button--primary text-caption",
      text: options.submit.label,
      onClick: handleSubmitButtonClick,
    });

    buttonContainer.appendChild(closeButton);
    buttonContainer.appendChild(submitButton);
    modalContainer.appendChild(buttonContainer);
  }

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

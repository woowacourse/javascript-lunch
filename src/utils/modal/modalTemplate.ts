import "./modal.css";

export const getModalTemplate = (modalContent: string): string => {
  return `
        <div class="modal-backdrop"></div>
        <div class="modal-container">
            ${modalContent}
        </div>
    `;
};

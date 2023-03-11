const modal = ({ id, content }) => {
  return `
    <div id="${id}" class="modal">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        ${content}
      </div>
    </div>
  `;
};

export default modal;

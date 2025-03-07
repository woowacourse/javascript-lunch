const createFormContent = ({ title }) => {
  return `
    <h2 class="modal-title text-title">${title}</h2>
    <form class="modal-form"></form>
  `;
};

export default createFormContent;

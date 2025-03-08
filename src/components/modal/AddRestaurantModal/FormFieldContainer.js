const FormFieldContainer = ({ contents, required, label, name }) => {
  return /* html */ `
    <div class="form-item ${required ? "form-item--required" : ""}">
      <label for="${name}" class="text-caption">${label}</label>
      ${contents}
    </div>
  `;
};

export default FormFieldContainer;

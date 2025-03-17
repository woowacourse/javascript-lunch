interface FormFieldContainerProps {
  contents: string;
  required?: boolean;
  label: string;
  name: string;
}

const FormFieldContainer = ({
  contents,
  required = false,
  label,
  name,
}: FormFieldContainerProps) => {
  return /* html */ `
    <div class="form-item ${required ? "form-item--required" : ""}">
      <label for="${name}" class="text-caption">${label}</label>
      ${contents}
    </div>
  `;
};

export default FormFieldContainer;

type Props = {
  labelText: string;
  label: string;
  children: string;
  isRequired?: boolean;
};

function FormItem({ labelText, label, children, isRequired = true }: Props) {
  const getTemplate = () => {
    return /* html */ `
          <div class="form-item" ${isRequired ? 'form-item--required' : ''}>
          <label for=${label} text-caption">${labelText}</label>
       ${children}
        </div>
          `;
  };

  return { getTemplate };
}

export default FormItem;

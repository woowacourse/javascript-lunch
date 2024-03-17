type Props = {
  labelText: string;
  label: string;
  children: HTMLElement;
  isRequired?: boolean;
  description?: string;
};

const FormItem = ({ labelText, label, children, isRequired = true }: Props) => {
  const createFormItemContainer = () => {
    const containerDiv = document.createElement('div');
    containerDiv.className = `form-item ${isRequired ? 'form-item--required' : ''}`;

    return containerDiv;
  };

  const createLabel = () => {
    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', label);
    labelElement.className = 'text-caption';
    labelElement.textContent = labelText;

    return labelElement;
  };

  const assembleFormItem = () => {
    const containerDiv = createFormItemContainer();
    const labelElement = createLabel();

    containerDiv.appendChild(labelElement);
    containerDiv.appendChild(children);

    return containerDiv;
  };

  const formItem = assembleFormItem();

  const create = () => formItem;

  return {
    create
  };
};

export default FormItem;

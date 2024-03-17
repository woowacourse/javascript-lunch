type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  options: SelectOption[];
  name?: string;
  required?: boolean;
  id?: string;
  className?: string;
};

const createOptionElement = ({ value, label }: SelectOption): HTMLOptionElement => {
  const optionElement = document.createElement('option');
  optionElement.value = value;
  optionElement.textContent = label;
  return optionElement;
};

const Select = ({ options, name, required = false, id, className }: SelectProps) => {
  const select = document.createElement('select');

  if (name) select.name = name;
  if (id) select.id = id;
  if (className) select.className = className;

  select.required = required;

  options.forEach((option) => select.appendChild(createOptionElement(option)));

  const create = () => select;

  return {
    create
  };
};

export default Select;

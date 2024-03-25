import { DropdownOption, DropdownProps } from '../../interface/DropdownInterfaces';

const Dropdown = ({ options, name, id, className, isRequired }: DropdownProps): HTMLElement => {
  const selectElement = document.createElement('select');
  if (name) selectElement.name = name;
  if (id) selectElement.id = id;
  if (className) selectElement.className = className;
  if (isRequired) selectElement.setAttribute('required', 'required');

  options.forEach((option: DropdownOption) => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.content;
    selectElement.appendChild(optionElement);
  });

  return selectElement;
};

export default Dropdown;

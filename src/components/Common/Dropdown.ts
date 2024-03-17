import { DropdownOption, DropdownProps } from '../../interface/DropdownInterfaces';

const Dropdown = ({ options, name, id, className, isRequired }: DropdownProps) => {
  return /*html*/ `
  <select name="${name}" id="${id}" class="${className}" ${isRequired ? 'required' : ''}>
    ${options.map((option: DropdownOption) => {
      return `<option value="${option.value}">${option.content}</option>`;
    })}
  </select>
  `;
};

export default Dropdown;

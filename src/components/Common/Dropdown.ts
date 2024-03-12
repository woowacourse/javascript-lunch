import { DropdownOption, DropdownProps } from '../../interface/RestaurantInterfaces';

const Dropdown = ({ options, label, name, id, className, isRequired }: DropdownProps) => {
  return /*html*/ `
  ${label ? `<label for="${name}" class="text-caption">${label}</label>` : ''}
  <select name="${name}" id="${id}" class="${className}" ${isRequired ? 'required' : ''}>
    ${options.map((option: DropdownOption) => {
      return `<option value="${option.value}">${option.content}</option>`;
    })}
  </select>
  `;
};

export default Dropdown;

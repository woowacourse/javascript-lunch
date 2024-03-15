interface DropdownOption {
  value: string;
  content: string;
}

interface DropdownProps {
  options: DropdownOption[];
  label?: string;
  name?: string;
  id?: string;
  className?: string;
  isRequired: boolean;
}

const Dropdown = (props: DropdownProps) => {
  const { options, label, name, id, className, isRequired } = props;

  return /*html*/ `
  ${label ? `<label for="${name}" class="text-caption">${label}</label>` : ''}
  <select name="${name}" id="${id}" class="${className}" ${isRequired ?? 'required'}>
    ${options.map((option: DropdownOption) => {
      return `<option value="${option.value}">${option.content}</option>`;
    })}
  </select>
  `;
};

export default Dropdown;

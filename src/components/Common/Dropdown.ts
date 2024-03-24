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

const createDropdown = (props: DropdownProps) => {
  const { options, label, name, id, className, isRequired } = props;
  const dropdownContainer = document.createElement('div');

  if (label) {
    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', name || '');
    labelElement.textContent = label;
    dropdownContainer.append(labelElement);
  }

  const selectElement = document.createElement('select');
  if (name) selectElement.setAttribute('name', name);
  if (id) selectElement.setAttribute('id', id);
  if (className) selectElement.setAttribute('class', className);
  if (isRequired) selectElement.setAttribute('required', 'true');

  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.setAttribute('value', option.value);
    optionElement.textContent = option.content;
    selectElement.add(optionElement);
  });

  dropdownContainer.append(selectElement);

  return Array.from(dropdownContainer.childNodes);
};

export default createDropdown;

// type SelectOption = {
//   value: string;
//   label: string;
// };

// type SelectProps = {
//   options: SelectOption[];
//   name?: string;
//   required?: boolean;
//   id?: string;
//   className?: string;
// };

// export default class SelectComponent {
//   private props: SelectProps;

//   constructor(props: SelectProps) {
//     this.props = props;
//   }

//   getTemplate() {
//     const { options, name, id, className } = this.props;
//     const template = document.createElement('template');
//     template.innerHTML = `
//       <select
//         ${name ? `name="${name}"` : ''}
//         ${id ? `id="${id}"` : ''}
//         ${className ? `class="${className}"` : ''}
//       >
//         ${options.map(({ value, label }) => `<option value="${value}">${label}</option>`).join('')}
//       </select>
//     `;
//     return template.content;
//   }
// }

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

const SelectComponent = ({ options, name, required = false, id, className }: SelectProps) => {
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

export default SelectComponent;

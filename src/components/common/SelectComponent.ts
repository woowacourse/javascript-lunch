type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  options: SelectOption[];
  name?: string;
  id?: string;
  required?: boolean;
  className?: string;
};

export default function SelectComponent({ options, name, id, required, className }: SelectProps) {
  const getTemplate = () => {
    const template = document.createElement('template');
    template.innerHTML = `
        <select 
          ${name ? `name="${name}"` : ''}
          ${id ? `id="${id}"` : ''}
          ${required ? 'required' : ''}
          ${className ? `class="${className}"` : ''}
        >
          ${options
            .map(({ value, label }) => `<option value="${value}">${label}</option>`)
            .join('')}
        </select>
      `;
    return template.content;
  };

  return { getTemplate };
}

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

export default class SelectComponent {
  private props: SelectProps;

  constructor(props: SelectProps) {
    this.props = props;
  }

  getTemplate() {
    const { options, name, id, className } = this.props;
    const template = document.createElement('template');
    template.innerHTML = `
      <select 
        ${name ? `name="${name}"` : ''}
        ${id ? `id="${id}"` : ''}
        ${className ? `class="${className}"` : ''}
      >
        ${options.map(({ value, label }) => `<option value="${value}">${label}</option>`).join('')}
      </select>
    `;
    return template.content;
  }
}

import Component from '../../core/Component.ts';

interface SelectProps {
  options: string[];
  selected: string;
  setValue: (value: string) => void;
}

export default class Select extends Component<null, SelectProps> {
  template() {
    return `
      <select name="select">
        ${this.props?.options
          .map(
            (option) =>
              `<option value="${option}" ${this.props?.selected === option ? 'selected' : ''}>${option}</option>`,
          )
          .join('')}
      </select>
    `;
  }

  //  <option value="${category}" ${this.props?.filter === category ? 'selected' : ''}>${category}</option>

  attachEventListener() {
    this.element?.querySelector('select')?.addEventListener('change', (event) => {
      this.props?.setValue((event?.target as HTMLSelectElement)?.value);
    });
  }
}

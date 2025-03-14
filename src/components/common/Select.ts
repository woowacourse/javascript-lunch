import Component from '../../core/Component.ts';
import { html } from '../../lib/utils.ts';

interface SelectProps {
  options: string[];
  selected: string;
  setValue: (value: string) => void;
}

export default class Select extends Component<null, SelectProps> {
  override template() {
    return html`
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

  override attachEventListener() {
    this.element?.querySelector('select')?.addEventListener('change', (event) => {
      this.props?.setValue((event?.target as HTMLSelectElement)?.value);
    });
  }
}

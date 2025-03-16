import Component from '../../core/Component.ts';
import { html } from '../../lib/utils.ts';
import EventHandler from '../../lib/EventHandler.ts';

interface SelectProps {
  options: string[];
  selected: string;
  setValue: (value: string) => void;
  dataAction: string;
}

export default class Select extends Component<null, SelectProps> {
  override template() {
    return html`
      <select name="select" data-action=${this.props.dataAction}>
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
    EventHandler.attachEventHandler(
      'change',
      (_, target) => {
        this.props?.setValue((target as HTMLSelectElement)?.value);
      },
      this.props.dataAction,
    );
  }
}

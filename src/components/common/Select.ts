import Component from '../../core/Component.ts';
import { html } from '../../lib/utils.ts';
import EventHandler from '../../lib/EventHandler.ts';

interface SelectProps<T extends string> {
  options: readonly T[];
  selected: T;
  setValue: (value: T) => void;
  dataAction: string;
}

export default class Select<T extends string> extends Component<null, SelectProps<T>> {
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
    EventHandler.attachEventListener(
      'change',
      ({ target }) => {
        this.props?.setValue((target as HTMLSelectElement)?.value as T);
      },
      this.props.dataAction,
    );
  }
}

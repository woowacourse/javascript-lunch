import { Component } from '../core/index.ts';
import { html } from '../../lib/utils.ts';
import { EventHandler } from '../../lib/modules/index.ts';

interface SelectProps<T extends string> {
  options: readonly { value: T; label: string }[];
  selected: T;
  setValue?: (value: T) => void;
  dataAction: string;
  required?: boolean;
}

export default class Select<T extends string> extends Component<null, SelectProps<T>> {
  override template() {
    return html`
      <select
        name=${this.props.dataAction}
        data-action=${this.props.dataAction}
        ${this.props.required ? 'required' : ''}
      >
        ${this.props?.options
          .map(
            (option) =>
              `<option value="${option.value}" ${this.props?.selected === option.value ? 'selected' : ''}>${option.label}</option>`,
          )
          .join('')}
      </select>
    `;
  }

  override attachEventListener() {
    EventHandler.attachEventListener(
      'change',
      ({ target }) => {
        if (this.props?.setValue) this.props.setValue((target as HTMLSelectElement)?.value as T);
      },
      this.props.dataAction,
    );
  }
}

import { Component } from '../core/index.ts';
import { html } from '../../lib/utils.ts';
import { EventHandler } from '../../lib/modules/index.ts';

type Option<T> = { value: T; label: string };

interface SelectProps<T extends string> {
  options: readonly Option<T>[];
  selected: T;
  setValue?: (value: T) => void; // setValue가 없다면 Uncontrolled, 있다면 Controlled
  dataAction: string;
  required?: boolean;
}

export default class Select<T extends string> extends Component<SelectProps<T>> {
  override template() {
    return html`
      <select
        name=${this.props.dataAction}
        data-action=${this.props.dataAction}
        ${this.props.required ? 'required' : ''}
      >
        ${this.props.options
          .map(
            (option) =>
              `<option value="${option.value}" ${this.props.selected === option.value ? 'selected' : ''}>${option.label}</option>`,
          )
          .join('')}
      </select>
    `;
  }

  override attachEventListener() {
    EventHandler.attachEventListener(
      'change',
      ({ target }) => {
        if (this.props.setValue) this.props.setValue((target as HTMLSelectElement)?.value as T);
      },
      this.props.dataAction,
    );
  }
}

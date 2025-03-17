import { eventHandlerInstance } from '@/lib/modules/index.ts';
import { html } from '@/lib/utils.ts';
import { forEach } from '@fxts/core';
import { Component } from '../core/index.ts';
import Option from './Option.ts';

type OptionType<T> = { value: T; label: string };

interface SelectProps<T extends string> {
  options: readonly OptionType<T>[];
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

  onRender() {
    forEach((option) => {
      this.appendChild(
        new Option({
          label: option.label,
          value: option.value,
          selected: this.props.selected === option.value,
        }).element,
      );
    }, this.props.options);
  }

  override addEventListener() {
    eventHandlerInstance.addEventListener({
      eventType: 'change',
      callback: ({ target }) => {
        if (this.props.setValue) this.props.setValue((target as HTMLSelectElement)?.value as T);
      },
      dataAction: this.props.dataAction,
    });
  }
}

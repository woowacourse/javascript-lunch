import { html } from '@/lib/utils';
import { Component } from '../core';

interface OptionProps {
  value: string;
  label: string;
  selected: boolean;
}

export default class Option extends Component<OptionProps> {
  template() {
    return html` <option value="${this.props.value}" ${this.props.selected ? 'selected' : ''}>
      ${this.props.label}
    </option>`;
  }
}

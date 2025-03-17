import { html } from '@/lib/utils';
import { Component } from '../core';

interface InputProps {
  name: string;
  id: string;
  maxlength?: number;
  type?: string;
  required?: boolean;
  dataAction?: string;
}

export default class Input extends Component<InputProps> {
  override template() {
    return html` <input
      name="${this.props.name}"
      id="${this.props.id}"
      ${this.props.maxlength ? `maxlength="${this.props.maxlength}"` : ''}
      ${this.props.type ? `type="${this.props.type}"` : ''}
      ${this.props.required ? 'required' : ''}
      ${this.props.dataAction ? `data-action="${this.props.dataAction}"` : ''}
    />`;
  }
}

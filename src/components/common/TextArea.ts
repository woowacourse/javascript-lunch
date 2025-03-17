import { html } from '../../lib/utils';
import { Component } from '../core';

interface TextAreaProps {
  name: string;
  id: string;
  maxlength?: number;
  type?: string;
  required?: boolean;
  cols?: number;
  rows?: number;
  dataAction?: string;
}

export default class TextArea extends Component<TextAreaProps> {
  override template() {
    return html`<textarea
      name="${this.props.name}"
      id="${this.props.id}"
      ${this.props.maxlength ? `maxlength="${this.props.maxlength}"` : ''}
      ${this.props.type ? `type="${this.props.type}"` : ''}
      ${this.props.required ? 'required' : ''}
      ${this.props.cols ? `cols="${this.props.cols}"` : ''}
      ${this.props.rows ? `rows="${this.props.rows}"` : ''}
      ${this.props.dataAction ? `data-action="${this.props.dataAction}"` : ''}
    ></textarea>`;
  }
}

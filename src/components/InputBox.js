import Component from '../core/Component.js';

export default class InputBox extends Component {
  template() {
    return `
      <div class="form-item ${this.props?.isRequired ? 'form-item--required' : ''}">
        <label for="category text-caption">${this.props.label}</label>
        ${this.props.input}
        <span class="help-text text-caption">${this.props.caption ?? ''}</span>
      </div>
    `;
  }
}

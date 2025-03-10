import Component from '../core/Component.js';

export default class Button extends Component {
  template() {
    return `
     <button
        class="button text-caption ${this.props?.class ?? ''} "
        ${this.props?.type ? `type = ${this.props?.type}` : ''}
        ${this.props?.id ? `id = ${this.props?.id}` : ''}
      >
      ${this.props?.message ?? ''}
    </button>`;
  }
}

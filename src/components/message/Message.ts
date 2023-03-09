import CustomElement from '../CustomElement';

class Message extends CustomElement {
  private get type() {
    return this.getAttribute('type');
  }

  private get position() {
    return this.getAttribute('position');
  }

  renderTemplate = () => {
    return `
      <div class="message-${this.type} alert-message message-${this.position}">
        ${this.innerText}
      </div>
    `;
  };

  render = () => {
    super.render();

    setTimeout(() => {
      this.remove();
    }, 1500);
  };
}

customElements.define('r-message', Message);

export default Message;

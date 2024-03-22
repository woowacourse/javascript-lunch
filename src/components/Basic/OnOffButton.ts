class OnOffButton extends HTMLDivElement {
  static observedAttributes = ['checked'];

  constructor() {
    super();

    this.setAttribute('checked', this.getAttribute('checked') ?? 'off');

    this.addEventListener('click', () => {
      if (this.isOn()) {
        this.off();
      } else {
        this.on();
      }
    });
  }

  isOn() {
    return this.getAttribute('checked') === 'on';
  }

  on() {
    this.setAttribute('checked', 'on');
  }
  off() {
    this.setAttribute('checked', 'off');
  }
}

customElements.define('on-off-button', OnOffButton, { extends: 'div' });

export default OnOffButton;

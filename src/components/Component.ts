import style from '../style/style';

abstract class Component extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.adoptedStyleSheets = [style];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.render();
  }

  abstract renderTemplate(): string;

  render() {
    this.shadowRoot!.innerHTML = this.renderTemplate();
  }

  connectedCallback() {
    this.render();
  }
}

// 몽키 패치: Shadow Tree내의 DOM이 host를 참조하려면
// this.getRootNode().host 와 같이 참조해야 했으나,
// HTMLElement에 host라는 getter를 추가하여 this.host를
// 사용하여 단축 접근이 가능하도록 구현
Object.defineProperty(HTMLElement.prototype, 'host', {
  get: function () {
    return this.getRootNode().host;
  },
});

export default Component;

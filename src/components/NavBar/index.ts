import { style } from '../style';
import $template from './index.html';

class NavBar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.assertShadowRoot();
    this.shadowRoot.adoptedStyleSheets = [style];
    this.render();
  }

  assertShadowRoot(): asserts this is { shadowRoot: ShadowRoot } {
    if (!this.shadowRoot) throw new Error();
  }

  render() {
    this.shadowRoot!.innerHTML = $template;
  }
}

export default NavBar;

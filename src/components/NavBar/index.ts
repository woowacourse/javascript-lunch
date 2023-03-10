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

  toggleTabColor($targetButton: HTMLButtonElement) {
    const $buttons = this.shadowRoot?.querySelectorAll('button');
    $buttons?.forEach(($button) => $button.classList.remove('button--selected'));
    $targetButton.classList.add('button--selected');
  }

  addRouteHandler(handler: CallableFunction) {
    this.shadowRoot?.addEventListener('click', (e: any) => {
      const $targetButton = e.target.closest('button');
      const tab = $targetButton.getAttribute('id');
      this.toggleTabColor($targetButton);
      handler(tab);
    });
  }
}

export default NavBar;

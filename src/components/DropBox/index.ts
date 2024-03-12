import DropBoxInnerHtmlMaker from './DropBoxInnerHtmlMaker';
import { DropBoxName } from '../../types';

class DropBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const dropBoxName = this.getAttribute('name') as DropBoxName;

    const innerHTML = new DropBoxInnerHtmlMaker(dropBoxName).html;

    if (innerHTML) {
      this.innerHTML = innerHTML;
    }
  }
}
customElements.define('drop-box', DropBox);

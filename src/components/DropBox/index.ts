import { DropBoxName } from '../../types';
import DropBoxInnerHtmlMaker from './DropBoxInnerHtmlMaker';

class DropBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const dropBoxName = this.getAttribute('name') as DropBoxName;

    if (this.#isDropBoxName(dropBoxName)) {
      this.innerHTML = new DropBoxInnerHtmlMaker(dropBoxName).innerHtml || '';
    }
  }

  #isDropBoxName(name: string): name is DropBoxName {
    const dropBoxNames: DropBoxName[] = [
      'category',
      'distance',
      'filteringCategory',
      'filteringSorting',
    ];

    return ([...dropBoxNames] as string[]).includes(name);
  }
}

customElements.define('drop-box', DropBox);

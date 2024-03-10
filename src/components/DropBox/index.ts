import { DropBoxName } from '../../types/index.ts';
import DropBoxInnerHtmlMaker from './DropBoxInnerHtmlMaker.ts';

class DropBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const dropBoxName = this.getAttribute('name') as DropBoxName;

    if (this.#isDropBoxName(dropBoxName)) {
      const innerHTML = new DropBoxInnerHtmlMaker(dropBoxName).innerHtml;
      this.innerHTML = innerHTML || '';
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

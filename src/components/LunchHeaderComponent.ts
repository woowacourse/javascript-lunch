import { $ } from '../util/dom';
import { AddButtonComponent } from './AddButtonComponent';

export function LunchHeaderComponent() {
  const buttonComponent = AddButtonComponent();

  const getTemplate = () => {
    const template = document.createElement('template');
    template.innerHTML = `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    </header>
  `;
    const node = template.content.cloneNode(true) as DocumentFragment;
    node.querySelector('.gnb')?.appendChild(buttonComponent.getTemplate());
    return node;
  };

  return {
    getTemplate
  };
}

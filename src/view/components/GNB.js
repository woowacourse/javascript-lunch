export default class GNB extends HTMLElement {
  constructor() {
    super();

    const template = document.querySelector('#template-header');
    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }

  connectedCallback() {
    const button = this.querySelector('.gnb__button');
    button.addEventListener('click', () => {
      const modal = document.querySelector('#addModal');
      modal.openModal();
    });
  }
}

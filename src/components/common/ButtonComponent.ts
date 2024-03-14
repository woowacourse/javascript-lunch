export default class ButtonComponent {
  getTemplate = (text: string, variant: 'primary' | 'secondary', type: string) => {
    const template = document.createElement('template');
    template.innerHTML = /*html*/ `
    <button type=${type} class="button button--${variant} text-caption">${text}</button> `;
    const node = template.content.cloneNode(true) as DocumentFragment;

    return node;
  };
}

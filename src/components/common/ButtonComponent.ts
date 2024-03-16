// export default class ButtonComponent {
//   getTemplate = (text: string, variant: 'primary' | 'secondary', type: string) => {
//     const template = document.createElement('template');
//     template.innerHTML = /*html*/ `
//     <button type=${type} class="button button--${variant} text-caption">${text}</button> `;
//     const node = template.content.cloneNode(true) as DocumentFragment;

//     return node;
//   };
// }

type Props = {
  id: string;
  text: string;
  variant: 'primary' | 'secondary';
  type?: 'button';
};

const ButtonComponent = ({ id, text, variant, type }: Props) => {
  const button = document.createElement('button');
  if (type) {
    button.type = type;
  }
  button.classList.add('button', `button--${variant}`, 'text-caption');
  button.textContent = text;
  button.id = id;

  const create = () => button;

  return {
    create
  };
};

export default ButtonComponent;

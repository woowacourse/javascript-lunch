interface Props {
  id: string;
  type: string;
  variant: string;
  content: string;
}

const createButton = ({ id, type, variant, content }: Props) => {
  return /*html*/ `
  <button id=${id} type=${type} class="button button--${variant} text-caption">${content}</button>
  `;
};

export default createButton;

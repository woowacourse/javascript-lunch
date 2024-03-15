interface Props {
  type: string;
  variant: string;
  content: string;
}

const createButton = ({ type, variant, content }: Props) => {
  return /*html*/ `
  <button type=${type} class="button button--${variant} text-caption">${content}</button>
  `;
};

export default createButton;

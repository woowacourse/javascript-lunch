const Button = (type: string, variant: 'primary' | 'secondary', content: string) => {
  return /*html*/ `
  <button type=${type} class="button button--${variant} text-caption">${content}</button>
  `;
};

export default Button;

const button = ({ id, type, style, content }) => {
  return `
    <button id="${id}" type="${type}" class="button button--${style} text-caption">${content}</button>
  `;
};

export default button;
